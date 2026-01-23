# Notable Sales - Update Guide

## How to Update Your Notable Sales

The Notable Sales section displays **exactly 4 sales** on the main page.

### File Location
Edit: `src/data/listings.js`

### Current Sales Structure

```javascript
{
    "id": "unique-id",           // Unique identifier (e.g., "potomac-3808")
    "status": "Sold",            // Always "Sold" for notable sales
    "title": "3808 POTOMAC AVE", // Property name/address (uppercase)
    "address": "Full Address",   // Complete address with city, state, zip
    "price": "$16,900,000",      // Sale price (formatted with $ and commas)
    "heroImage": "image.webp",   // Image filename in R2 (or house-thumb.jpg as placeholder)
    "specs": {
        "beds": 6,               // Number of bedrooms
        "baths": 11,             // Number of bathrooms
        "sqft": "10,000"         // Square footage (as string with commas)
    }
}
```

### To Update a Sale:

1. Open `src/data/listings.js`
2. Find the sale you want to update
3. Edit the fields:
   - **title**: Property address or name (UPPERCASE)
   - **address**: Full address
   - **price**: Sale price (include $ and commas)
   - **heroImage**: Upload image to R2, use filename here
   - **specs**: Update beds, baths, sqft

### To Add Images:

**Option 1: Use R2 (Recommended for Hero Image)**
1. Upload image to your R2 bucket
2. Use just the filename: `"heroImage": "my-property.webp"`

**Option 2: Manual Array (For specific specific photos)**
- List each filename in the `photos` array:
  ```javascript
  "photos": ["img1.webp", "img2.webp", "img3.webp"]
  ```

**Option 3: Bulk Loading (Best for 20+ images)**
If you have many images, follow this naming convention in R2:
1. Create a folder in R2 for the property (e.g., `potomac`)
2. Name your images with a number: `potomac-1.webp`, `potomac-2.webp`, ... `potomac-25.webp`
3. In `manualListings.js`, add these two lines to the property:
   ```javascript
   "photoPrefix": "potomac",
   "photoCount": 25
   ```
   The site will automatically find all 25 images!

**Option 4: Placeholder**
- Use `"heroImage": "house-thumb.jpg"` until you have the real image

### Example Update:

```javascript
{
    "id": "highland-park-estate",
    "status": "Sold",
    "title": "4500 BEVERLY DR",
    "address": "4500 Beverly Dr, Highland Park, TX 75205",
    "price": "$12,500,000",
    "heroImage": "4500-beverly-hero.webp",  // Upload this to R2 first
    "specs": {
        "beds": 6,
        "baths": 8,
        "sqft": "9,200"
    }
}
```

### For Private/Off-Market Sales:

You can add any sale, whether it hit MLS or not! Just include the details you want to share.

### After Making Changes:

1. Save the file
2. Run: `git add .`
3. Run: `git commit -m "Update notable sales"`
4. Run: `git push`

The changes will be live after deployment!

---

## Current Sales (Top 4 Displayed):

1. **3808 POTOMAC AVE** - $16,900,000
2. **416 21ST PL** - $6,995,000  
3. **1041 N HILLCREST RD** - $12,400,000
4. **LUXURY ESTATE** - $8,500,000 (placeholder - update this!)

**Note:** Only the first 4 sales in the array will be displayed on the main page.
