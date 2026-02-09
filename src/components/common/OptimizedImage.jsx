import { getFullImageUrl, getOptimizedImageUrl } from '../../utils/imageHandler';

/**
 * OptimizedImage component that leverages Cloudflare Image Resizing.
 * Handles R2 bucket images dynamically with automatic formatting and quality optimization.
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
    if (!src) return null;

    const fullUrl = getFullImageUrl(src);

    if (isHero) {
        // Hero images get a 2000px high-res version in srcset
        const src1000 = getOptimizedImageUrl(src, { width: 1000, quality });
        const src2000 = getOptimizedImageUrl(src, { width: 2000, quality });
        const srcSet = `${src1000} 1000w, ${src2000} 2000w`;

        return (
            <img
                src={src2000}
                srcSet={srcSet}
                sizes="(max-width: 1000px) 1000px, 2000px"
                alt={alt}
                className={className}
                loading="eager"
                {...props}
            />
        );
    }

    const optimizedSrc = getOptimizedImageUrl(src, { width, quality });

    return (
        <img
            src={optimizedSrc}
            alt={alt}
            className={className}
            loading="lazy"
            {...props}
        />
    );
};

export default OptimizedImage;


