// Mock data generator for property listings
// Generates 50 fake listings centered around Dallas, TX

const DALLAS_CENTER = {
    lat: 32.7767,
    lng: -96.7970
};

const PROPERTY_TYPES = ['Single Family', 'Condo', 'Townhouse', 'Luxury Estate'];
const STATUSES = ['Active', 'Pending', 'Sold'];
const STREET_NAMES = [
    'Oak', 'Maple', 'Cedar', 'Pine', 'Elm', 'Willow', 'Birch', 'Magnolia',
    'Highland', 'Park', 'Lake', 'River', 'Forest', 'Garden', 'Valley', 'Hill'
];
const STREET_TYPES = ['Lane', 'Drive', 'Avenue', 'Street', 'Boulevard', 'Court', 'Place', 'Way'];

// Unsplash architectural photo IDs for high-quality placeholders
const UNSPLASH_PHOTOS = [
    'photo-1600585154340-be6161a56a0c', // Modern house
    'photo-1600596542815-ffad4c1539a9', // Luxury home
    'photo-1600607687939-ce8a6c25118c', // Contemporary house
    'photo-1600566753190-17f0baa2a6c3', // Estate
    'photo-1600047509807-ba8f99d2cdde', // Modern architecture
    'photo-1600585154526-990dced4db0d', // Luxury property
    'photo-1600573472592-401b489a3cdc', // Contemporary home
    'photo-1600607687644-c7171b42498b', // Modern estate
    'photo-1600210492493-0946911123ea', // Luxury house
    'photo-1600607687920-4e2a09cf159d'  // Contemporary property
];

// Generate random coordinate within radius of Dallas
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

// Generate random address
function generateAddress(index) {
    const number = Math.floor(Math.random() * 9000) + 1000;
    const street = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
    const type = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
    return `${number} ${street} ${type}`;
}

// Generate random price
function generatePrice() {
    const min = 300000;
    const max = 5000000;
    const price = Math.floor(Math.random() * (max - min) + min);
    // Round to nearest 10k
    return Math.round(price / 10000) * 10000;
}

// Generate mock listing
function generateListing(id) {
    const beds = Math.floor(Math.random() * 5) + 2; // 2-6 beds
    const baths = Math.floor(Math.random() * 7) + 2; // 2-8 baths
    const sqft = Math.floor(Math.random() * 6500) + 1500; // 1,500-8,000 sqft
    const price = generatePrice();
    const coords = generateCoordinate();
    const photoId = UNSPLASH_PHOTOS[Math.floor(Math.random() * UNSPLASH_PHOTOS.length)];

    return {
        id: `listing-${id}`,
        address: generateAddress(id),
        city: 'Dallas',
        state: 'TX',
        zipCode: `75${Math.floor(Math.random() * 900) + 100}`,
        price: price,
        priceFormatted: `$${(price / 1000).toFixed(0)}K`,
        beds: beds,
        baths: baths,
        sqft: sqft,
        sqftFormatted: sqft.toLocaleString(),
        propertyType: PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)],
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
        coordinates: coords,
        image: `https://images.unsplash.com/${photoId}?w=800&q=80&auto=format&fit=crop`,
        description: `Beautiful ${beds} bedroom, ${baths} bathroom property in Dallas. Features modern amenities and excellent location.`
    };
}

// Generate all 50 listings
export const mockListings = Array.from({ length: 50 }, (_, i) => generateListing(i + 1));

// Helper function to filter listings by map bounds
export function filterListingsByBounds(listings, bounds) {
    if (!bounds) return listings;

    const { north, south, east, west } = bounds;

    return listings.filter(listing => {
        const { lat, lng } = listing.coordinates;
        return lat >= south && lat <= north && lng >= west && lng <= east;
    });
}

// Helper function to get listing by ID
export function getListingById(id) {
    return mockListings.find(listing => listing.id === id);
}
