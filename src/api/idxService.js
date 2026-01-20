/**
 * SimplyRETS API Service
 * 
 * Documentation: https://docs.simplyrets.com/api/index.html
 * Base URL: https://api.simplyrets.com
 */

const SIMPLYRETS_BASE_URL = 'https://api.simplyrets.com';

/**
 * Create Basic Auth header for SimplyRETS API
 */
const getAuthHeader = () => {
    const apiKey = import.meta.env.VITE_SIMPLYRETS_API_KEY;
    const apiSecret = import.meta.env.VITE_SIMPLYRETS_API_SECRET;

    // Debug logging for production builds
    if (import.meta.env.MODE === 'production') {
        console.log('🔍 Environment Check:', {
            mode: import.meta.env.MODE,
            hasApiKey: !!apiKey,
            hasApiSecret: !!apiSecret,
            apiKeyValue: apiKey ? `${apiKey.substring(0, 3)}...` : 'undefined'
        });
    }

    if (!apiKey || !apiSecret) {
        console.error('❌ SimplyRETS API credentials not found in environment variables');
        console.error('Expected: VITE_SIMPLYRETS_API_KEY and VITE_SIMPLYRETS_API_SECRET');
        console.error('Available env vars:', Object.keys(import.meta.env));
        return null;
    }

    // Basic Auth: base64 encode "username:password"
    const credentials = btoa(`${apiKey}:${apiSecret}`);
    return `Basic ${credentials}`;
};

/**
 * Fetch properties from SimplyRETS API
 * 
 * @param {Object} params - Query parameters
 * @param {number} params.minprice - Minimum price
 * @param {number} params.maxprice - Maximum price
 * @param {string} params.cities - Comma-separated list of cities
 * @param {string} params.neighborhoods - Comma-separated list of neighborhoods
 * @param {number} params.minbeds - Minimum bedrooms
 * @param {number} params.minbaths - Minimum bathrooms
 * @param {string} params.status - Property status (Active, Pending, Closed)
 * @param {number} params.limit - Number of results (default: 50, max: 500)
 * @param {number} params.offset - Pagination offset
 * @param {string} params.type - Property type (Residential, Condo, etc.)
 * @returns {Promise<Array>} Array of property listings
 */
export const fetchProperties = async (params = {}) => {
    const authHeader = getAuthHeader();

    if (!authHeader) {
        throw new Error('SimplyRETS API credentials not configured');
    }

    // Build query string from params
    const queryParams = new URLSearchParams();

    // Add all provided parameters
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value);
        }
    });

    const url = `${SIMPLYRETS_BASE_URL}/properties?${queryParams.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`SimplyRETS API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return mapSimplyRETSToListings(data);
    } catch (error) {
        console.error('Error fetching properties from SimplyRETS:', error);
        throw error;
    }
};

/**
 * Fetch a single property by MLS ID
 * 
 * @param {string} mlsId - MLS listing ID
 * @returns {Promise<Object>} Property listing
 */
export const fetchPropertyById = async (mlsId) => {
    const authHeader = getAuthHeader();

    if (!authHeader) {
        throw new Error('SimplyRETS API credentials not configured');
    }

    const url = `${SIMPLYRETS_BASE_URL}/properties/${mlsId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`SimplyRETS API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return mapSimplyRETSProperty(data);
    } catch (error) {
        console.error('Error fetching property from SimplyRETS:', error);
        throw error;
    }
};

/**
 * Map SimplyRETS API response to our PropertyCard format
 * 
 * @param {Array} simplyRETSData - Array of properties from SimplyRETS
 * @returns {Array} Mapped property listings
 */
const mapSimplyRETSToListings = (simplyRETSData) => {
    if (!Array.isArray(simplyRETSData)) {
        return [];
    }

    return simplyRETSData.map(property => mapSimplyRETSProperty(property));
};

/**
 * Map a single SimplyRETS property to our format
 * 
 * @param {Object} property - SimplyRETS property object
 * @returns {Object} Mapped property listing
 */
const mapSimplyRETSProperty = (property) => {
    // SimplyRETS property structure:
    // https://docs.simplyrets.com/api/index.html#/Listings/get_properties

    const address = property.address || {};
    const geo = property.geo || {};
    const photos = property.photos || [];

    return {
        id: property.mlsId || property.listingId,
        source: "mls", // Differentiate from manual entries
        mlsId: property.mlsId,
        listingId: property.listingId,

        // Address
        address: formatAddress(address),
        fullAddress: `${address.full || ''}`,
        street: address.streetNumber && address.streetName
            ? `${address.streetNumber} ${address.streetName}`
            : '',
        city: address.city || '',
        state: address.state || '',
        zip: address.postalCode || '',

        // Location
        lat: geo.lat,
        lng: geo.lng,
        coordinates: geo.lat && geo.lng ? { lat: geo.lat, lng: geo.lng } : null,

        // Price
        price: property.listPrice || 0,
        priceFormatted: formatPrice(property.listPrice),

        // Property details
        beds: property.property?.bedrooms || 0,
        baths: property.property?.bathsFull || 0,
        sqft: property.property?.area || 0,
        sqftFormatted: formatNumber(property.property?.area),

        // Status
        status: property.mls?.status || 'Active',

        // Images
        image: photos.length > 0 ? photos[0] : '/placeholder-house.jpg',
        photos: photos,

        // Additional details
        type: property.property?.type || '',
        yearBuilt: property.property?.yearBuilt,
        lotSize: property.property?.lotSize,
        parking: property.property?.parking,

        // Listing info
        listDate: property.listDate,
        agent: property.agent,
        office: property.office,

        // Raw data for detail view
        raw: property
    };
};

/**
 * Format address for display
 */
const formatAddress = (address) => {
    const parts = [];

    if (address.streetNumber && address.streetName) {
        parts.push(`${address.streetNumber} ${address.streetName}`);
    } else if (address.full) {
        return address.full;
    }

    if (address.city) {
        parts.push(address.city);
    }

    if (address.state) {
        parts.push(address.state);
    }

    if (address.postalCode) {
        parts.push(address.postalCode);
    }

    return parts.join(', ');
};

/**
 * Format price for display
 */
const formatPrice = (price) => {
    if (!price) return '$0';
    return `$${price.toLocaleString()}`;
};

/**
 * Format number with commas
 */
const formatNumber = (num) => {
    if (!num) return '0';
    return num.toLocaleString();
};

/**
 * Get available cities from SimplyRETS
 * Note: This may require a separate endpoint or filtering from all properties
 */
export const getAvailableCities = async () => {
    // This would need to be implemented based on your specific needs
    // You might want to fetch all properties and extract unique cities
    // or maintain a static list of cities you serve
    return [];
};

export default {
    fetchProperties,
    fetchPropertyById,
    getAvailableCities,
};
