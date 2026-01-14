export const listings = [
    {
        "id": "potomac-3808",
        "status": "Sold",
        "title": "3808 POTOMAC AVE",
        "address": "3808 POTOMAC AVE, HIGHLAND PARK, TX 75205",
        "price": "$16,900,000",
        "heroImage": "3808-Potomac-Hero.webp",
        "specs": {
            "beds": 6,
            "baths": 11,
            "sqft": "10,000"
        }
    },
    {
        "id": "notable-sale-01",
        "status": "Sold",
        "title": "416 21ST PL",
        "address": "416 21ST PL, SANTA MONICA, CA 90402",
        "price": "$12,500,000",
        "heroImage": "house-thumb.jpg",
        "specs": {
            "beds": 6,
            "baths": 8,
            "sqft": "6,370"
        }
    },
    {
        "id": "notable-sale-02",
        "status": "Sold",
        "title": "1041 N HILLCREST RD",
        "address": "1041 N HILLCREST ROAD, BEVERLY HILLS, CA 90210",
        "price": "$12,400,000",
        "heroImage": "house-thumb.jpg",
        "specs": {
            "beds": 5,
            "baths": 6,
            "sqft": "6,293"
        }
    }
];

// Helper function to get sold listings
export const getSoldListings = () => {
    return listings.filter(listing => listing.status === "Sold");
};

// Helper function to get active listings
export const getActiveListings = () => {
    return listings.filter(listing => listing.status === "Active");
};

// Helper function to get listing by ID
export const getListingById = (id) => {
    return listings.find(listing => listing.id === id);
};
