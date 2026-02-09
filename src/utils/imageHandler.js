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
 * Returns an optimized Cloudflare Image Resizing URL.
 */
export const getOptimizedImageUrl = (path, options = {}) => {
    const fullUrl = getFullImageUrl(path);

    // Only optimize if it's an R2 image and not already optimized
    const isR2Image = fullUrl.includes(SITE_CONFIG.mediaBaseUrl.replace(/^https?:\/\//, ''));
    if (!isR2Image || fullUrl.includes('/cdn-cgi/image/')) {
        return fullUrl;
    }

    const { width = 1000, quality = 80, format = 'auto' } = options;
    const params = `width=${width},quality=${quality},format=${format}`;

    return `/cdn-cgi/image/${params}/${fullUrl}`;
};
