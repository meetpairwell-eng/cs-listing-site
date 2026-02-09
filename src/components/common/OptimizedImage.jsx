import { useState, useEffect } from 'react';
import { getFullImageUrl, getOptimizedImageUrl } from '../../utils/imageHandler';
import './OptimizedImage.css';

/**
 * OptimizedImage component that leverages Cloudflare Image Resizing.
 * Handles R2 bucket images dynamically with automatic formatting and quality optimization.
 * Includes a "blur-up" placeholder effect for specific properties (e.g., Lobello).
 */
const OptimizedImage = ({
    src,
    alt = '',
    className = '',
    isHero = false,
    width = 1000,
    quality = 80,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!src) return null;

    const fullUrl = getFullImageUrl(src);
    const isLobello = src.toLowerCase().includes('lobello');

    // Low-res placeholder for blur-up effect
    const placeholderUrl = getOptimizedImageUrl(src, { width: 30, quality: 30, format: 'auto' });

    if (isHero) {
        // Hero images get a 2000px high-res version in srcset
        const src1000 = getOptimizedImageUrl(src, { width: 1000, quality });
        const src2000 = getOptimizedImageUrl(src, { width: 2000, quality });
        const srcSet = `${src1000} 1000w, ${src2000} 2000w`;

        return (
            <div className={`optimized-image-container is-hero ${className}`}>
                {isLobello && (
                    <img
                        src={placeholderUrl}
                        className={`placeholder-img ${isLoaded ? 'fade-out' : ''}`}
                        alt=""
                        aria-hidden="true"
                    />
                )}
                <img
                    src={src2000}
                    srcSet={srcSet}
                    sizes="(max-width: 1000px) 1000px, 2000px"
                    alt={alt}
                    className={`main-img ${(!isLobello || isLoaded) ? 'loaded' : ''}`}
                    loading="eager"
                    onLoad={() => setIsLoaded(true)}
                    {...props}
                />
            </div>
        );
    }

    const optimizedSrc = getOptimizedImageUrl(src, { width, quality });

    return (
        <div className={`optimized-image-container ${className}`}>
            {isLobello && (
                <img
                    src={placeholderUrl}
                    className={`placeholder-img ${isLoaded ? 'fade-out' : ''}`}
                    alt=""
                    aria-hidden="true"
                />
            )}
            <img
                src={optimizedSrc}
                alt={alt}
                className={`main-img ${(!isLobello || isLoaded) ? 'loaded' : ''}`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                {...props}
            />
        </div>
    );
};

export default OptimizedImage;

