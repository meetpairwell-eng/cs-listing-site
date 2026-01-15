
const DALLAS_CENTER = {
    lat: 32.7767,
    lng: -96.7970
};

function generateCoordinate() {
    const radiusMiles = 15;
    // 1 degree latitude ≈ 69 miles
    // 1 degree longitude ≈ 54.6 miles at Dallas latitude
    const latOffset = (Math.random() - 0.5) * (radiusMiles / 69);
    const lngOffset = (Math.random() - 0.5) * (radiusMiles / 54.6);

    return {
        lat: DALLAS_CENTER.lat + latOffset,
        lng: DALLAS_CENTER.lng + lngOffset
    };
}

console.log("Center:", DALLAS_CENTER);
console.log("Sample 1:", generateCoordinate());
console.log("Sample 2:", generateCoordinate());
console.log("Sample 3:", generateCoordinate());
