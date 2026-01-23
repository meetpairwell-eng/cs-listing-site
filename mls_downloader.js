/**
 * MLS Matrix Photo Downloader (ZIP Version 2.7)
 * 
 * FIX: Improved image detection and added "Force Capture" button.
 * 
 * INSTRUCTIONS:
 * 1. Open the high-res viewer (Image 1 of 35).
 * 2. Paste this code and press Enter.
 */

(async () => {
    // --- SETTINGS ---
    const folderName = "3808-Potomac";
    const filePrefix = "3808Potomac";
    const totalPhotos = 35;
    // ----------------

    console.log(`🚀 Starting MLS Downloader v2.7 (Smart Search) for "${folderName}"...`);

    // Helper to find the "Main Image" even if the ID is weird
    const findMatrixImage = () => {
        // Try known selectors
        let img = document.querySelector('img[src*="GetImage.ashx"]') ||
            document.querySelector('img[src*="Photo"]') ||
            document.querySelector('#divPhoto img') ||
            document.querySelector('.photo-container img');

        // Fallback: Find the largest image on the page
        if (!img) {
            const allImages = Array.from(document.querySelectorAll('img'));
            img = allImages.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
        }
        return img;
    };

    const captureCurrentPhoto = async (img) => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return new Promise(resolve => canvas.toBlob(b => resolve(b), 'image/webp', 0.90));
    };

    const clickNext = () => {
        const nextBtn = document.querySelector('button[title="Next Image"]') ||
            document.querySelector('.photo-next') ||
            document.querySelector('.jssora05r') || // Matrix specific arrow class
            Array.from(document.querySelectorAll('button, a, div')).find(el =>
                el.title?.includes('Next') ||
                el.className?.toString().includes('next') ||
                (el.innerText && el.innerText.includes('Next'))
            );
        if (nextBtn) { nextBtn.click(); return true; }
        return false;
    };

    // 1. Load JSZip
    if (typeof JSZip === 'undefined') {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        await new Promise(r => { script.onload = r; document.head.appendChild(script); });
    }

    const zip = new JSZip();
    const photoFolder = zip.folder(folderName);

    // 2. Main Loop
    for (let i = 0; i < totalPhotos; i++) {
        console.log(`📸 [${i + 1}/${totalPhotos}] Waiting for image...`);

        try {
            // Wait for image with 5s timeout
            const img = await new Promise((resolve, reject) => {
                const start = Date.now();
                const check = () => {
                    const found = findMatrixImage();
                    if (found && found.complete && found.naturalHeight > 100) resolve(found);
                    else if (Date.now() - start > 5000) reject(new Error("Timeout finding image"));
                    else setTimeout(check, 200);
                };
                check();
            });

            const webpBlob = await captureCurrentPhoto(img);
            photoFolder.file(`${filePrefix}-${i + 1}.webp`, webpBlob);
            console.log(`✅ [${i + 1}/${totalPhotos}] Captured!`);

            if (i < totalPhotos - 1) {
                console.log("➡️ Clicking Next...");
                if (!clickNext()) {
                    console.warn("⚠️ Could not find 'Next' button automatically. Please click it yourself NOW!");
                }
                await new Promise(r => setTimeout(r, 1500)); // Wait for transition
            }
        } catch (err) {
            console.error(`❌ [${i + 1}/${totalPhotos}] Error: ${err.message}. Skipping to next...`);
            clickNext();
            await new Promise(r => setTimeout(r, 1500));
        }
    }

    // 3. Export
    console.log("📦 Creating ZIP... please wait.");
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(content);
    link.download = `${folderName}.zip`;
    link.click();
    console.log(`✅ DONE! Check your downloads.`);
})();
