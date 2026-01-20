export const manualListings = [
    {
        "id": "potomac-3808",
        "source": "manual",
        "status": "Sold",
        "isOffMarket": true,
        "isFeatured": true,
        "displayPriority": 1,
        "title": "3808 POTOMAC AVE",
        "address": "3808 POTOMAC AVE, HIGHLAND PARK, TX 75205",
        "price": "Price Upon Request",
        "heroImage": "3808-Potomac-Hero.webp",
        "specs": {
            "beds": 6,
            "baths": 11,
            "sqft": "10,000"
        }
    },
    {
        "id": "notable-sale-01",
        "source": "manual",
        "status": "Sold",
        "isOffMarket": true,
        "isFeatured": true,
        "displayPriority": 2,
        "title": "5609 Ursula Ln",
        "address": "5609 Ursula Ln, Dallas, TX 75229",
        "price": "Price Upon Request",
        "heroImage": "5609-Ursula-Hero.webp",
        "specs": {
            "beds": 5,
            "baths": 8,
            "sqft": "7,200"
        }
    },
    {
        "id": "notable-sale-02",
        "source": "manual",
        "status": "Sold",
        "isOffMarket": false,
        "isFeatured": true,
        "displayPriority": 3,
        "title": "1041 N HILLCREST RD",
        "address": "1041 N HILLCREST ROAD, BEVERLY HILLS, CA 90210",
        "price": "$12,400,000",
        "heroImage": "house-thumb.jpg",
        "specs": {
            "beds": 5,
            "baths": 6,
            "sqft": "6,293"
        }
    },
    {
        "id": "notable-sale-03",
        "source": "manual",
        "status": "Sold",
        "isOffMarket": false,
        "isFeatured": true,
        "displayPriority": 4,
        "title": "LUXURY ESTATE",
        "address": "Dallas, TX",
        "price": "$8,500,000",
        "heroImage": "house-thumb.jpg",
        "specs": {
            "beds": 5,
            "baths": 7,
            "sqft": "8,500"
        }
    }
];

// Helper function to get sold listings
export const getSoldListings = () => {
    return manualListings.filter(listing => listing.status === "Sold");
};

// Helper function to get active listings
export const getActiveListings = () => {
    return manualListings.filter(listing => listing.status === "Active");
};

// Helper function to get listing by ID
export const getListingById = (id) => {
    return manualListings.find(listing => listing.id === id);
};
