import { SITE_CONFIG } from '../config';

/**
 * Resolves the full URL for an image from its path.
 */
export const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    const baseUrl = SITE_CONFIG.mediaBaseUrl || '';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cleanBase}/${cleanPath}`;
};

/**
 * Returns the image URL. Images are already in webp format from R2,
 * so no additional optimization is needed.
 */
export const getOptimizedImageUrl = (path, options = {}) => {
    return getFullImageUrl(path);
};
