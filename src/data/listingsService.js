/**
 * Unified Listings Service
 * 
 * Combines manual off-market properties with MLS imports
 * Provides a single interface for all property data
 */

import { manualListings } from './manualListings';
import { fetchProperties } from '../api/idxService';

// Normalize images and expand photos for testing/consistency
const normalizeListing = (item) => {
    if (!item) return item;

    // Determine the best main image
    const mainImage = item.image || item.heroImage || (item.photos && item.photos.length > 0 ? item.photos[0] : null);

    // If we still don't have an image, use a placeholder
    const finalImage = mainImage || '/placeholder-house.jpg';

    // Handle photos array
    let finalPhotos = item.photos || [];

    // Support for bulk loading: photoPrefix and photoCount
    // Example: photoDirectory: '6840-lakewood', photoPrefix: 'lakewood', photoCount: 12
    // Results in: '6840-lakewood/lakewood-1.webp', etc.
    if (item.photoCount && item.photoPrefix) {
        const directory = item.photoDirectory || item.photoPrefix;
        const generatedPhotos = [];
        for (let i = 1; i <= item.photoCount; i++) {
            generatedPhotos.push(`${directory}/${item.photoPrefix}-${i}.webp`);
        }
        // If there are manual photos, put them first, then the bulk ones
        finalPhotos = [...finalPhotos, ...generatedPhotos];
    }

    // Deduplicate photos and filter out empty strings
    finalPhotos = [...new Set(finalPhotos)].filter(Boolean);

    // If NO photos at all (manual or generated), only then fallback to hero image
    if (finalPhotos.length === 0) {
        finalPhotos = [finalImage];
    }

    return {
        ...item,
        image: finalImage,
        photos: finalPhotos
    };
};

/**
 * Get all listings from both manual and MLS sources
 * @param {Object} filters - Filter options
 * @param {string} filters.status - Property status filter
 * @param {boolean} filters.includeMLS - Whether to include MLS properties (default: true)
 * @param {string} filters.source - Filter by source: 'manual', 'mls', or undefined for both
 * @returns {Promise<Array>} Combined array of properties
 */
export const getAllListings = async (filters = {}) => {
    const { status, includeMLS = true, source, ...mlsFilters } = filters;

    // Get manual listings
    let manual = [...manualListings];

    // Apply status filter to manual listings
    if (status) {
        manual = manual.filter(listing => listing.status === status);
    }

    // Get MLS listings if requested
    let mls = [];
    if (includeMLS && source !== 'manual') {
        try {
            const mlsParams = {
                ...mlsFilters,
                status: status || 'Active'
            };

            // Add agent filter if MLS ID is configured
            // This allows sample data to work without an agent ID
            // Once you have your real MLS credentials, just add VITE_AGENT_MLS_ID to .env.local
            const agentMlsId = import.meta.env.VITE_AGENT_MLS_ID;
            if (agentMlsId) {
                mlsParams.agent = agentMlsId;
            }

            mls = await fetchProperties(mlsParams);
        } catch (error) {
            console.error('MLS fetch failed, using manual listings only:', error);
            // Gracefully degrade to manual listings only
        }
    }

    // Combine both sources
    let combined = [];

    if (source === 'manual') {
        combined = manual;
    } else if (source === 'mls') {
        combined = mls;
    } else {
        combined = [...manual, ...mls];
    }

    // Sort by display priority (manual) or price/date
    combined.sort((a, b) => {
        // Manual entries with displayPriority come first
        if (a.source === 'manual' && a.displayPriority) {
            if (b.source === 'manual' && b.displayPriority) {
                return a.displayPriority - b.displayPriority;
            }
            return -1; // a comes first
        }
        if (b.source === 'manual' && b.displayPriority) {
            return 1; // b comes first
        }

        // For sold properties, sort by price (highest first)
        if (status === 'Sold') {
            const priceA = extractPrice(a.price || a.priceFormatted);
            const priceB = extractPrice(b.price || b.priceFormatted);

            // If both have valid prices, sort by price
            if (priceA > 0 && priceB > 0) {
                return priceB - priceA; // Highest price first
            }
            // If only one has a price, prioritize it
            if (priceA > 0) return -1;
            if (priceB > 0) return 1;
        }

        // Otherwise sort by date
        const dateA = new Date(a.listDate || 0);
        const dateB = new Date(b.listDate || 0);
        return dateB - dateA; // Most recent first
    });

    return combined.map(normalizeListing);
};

/**
 * Extract numeric price from price string
 * @param {string|number} price - Price string or number
 * @returns {number} Numeric price value
 */
const extractPrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price || typeof price !== 'string') return 0;

    // Remove everything except digits
    const numericPrice = price.replace(/[^0-9]/g, '');
    return parseInt(numericPrice, 10) || 0;
};

/**
 * Get notable sales for homepage showcase
 * Prioritizes manually curated featured properties
 * @param {number} limit - Maximum number of results (default: 4)
 * @returns {Array} Featured sold properties
 */
export const getNotableSales = (limit = 4) => {
    return manualListings
        .filter(listing => listing.isFeatured && listing.status === 'Sold')
        .sort((a, b) => (a.displayPriority || 999) - (b.displayPriority || 999))
        .slice(0, limit).map(normalizeListing);
};

/**
 * Get all sold listings from both sources
 * @returns {Promise<Array>} Sold properties
 */
export const getSoldListings = async () => {
    return await getAllListings({ status: 'Sold' });
};

/**
 * Get all active listings from both sources
 * @returns {Promise<Array>} Active properties
 */
export const getActiveListings = async () => {
    return await getAllListings({ status: 'Active' });
};

/**
 * Get a single listing by ID from either source
 * @param {string} id - Property ID
 * @returns {Promise<Object|null>} Property or null if not found
 */
export const getListingById = async (id) => {
    let result = null;

    // Check manual listings first
    const manualListing = manualListings.find(listing => listing.id === id);
    if (manualListing) {
        result = manualListing;
    } else {
        // If not found in manual, try MLS
        try {
            const { fetchPropertyById } = await import('../api/idxService');
            result = await fetchPropertyById(id);
        } catch (error) {
            console.error(`Property ${id} not found:`, error);
            result = null;
        }
    }

    return result ? normalizeListing(result) : null;
};

/**
 * Check if a property is from manual source
 * @param {Object} listing - Property object
 * @returns {boolean}
 */
export const isManualListing = (listing) => {
    return listing?.source === 'manual';
};

/**
 * Check if a property is from MLS source
 * @param {Object} listing - Property object
 * @returns {boolean}
 */
export const isMLSListing = (listing) => {
    return listing?.source === 'mls';
};

/**
 * Check if a property is an off-market sale
 * @param {Object} listing - Property object
 * @returns {boolean}
 */
export const isOffMarket = (listing) => {
    return listing?.isOffMarket === true;
};

export default {
    getAllListings,
    getNotableSales,
    getSoldListings,
    getActiveListings,
    getListingById,
    isManualListing,
    isMLSListing,
    isOffMarket
};
