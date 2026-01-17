import { useState } from 'react';
import { SITE_CONFIG } from '../config';
import { testimonials } from '../data/testimonials';
import './Testimonials.css';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Helper to get correct asset URL
    const getAssetUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) return path;
        return `${SITE_CONFIG.mediaBaseUrl}/${path}`;
    };

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Calculate indices for circular display
    // We want to show: Prev, Current, Next (total 3 for context)
    // Or simpler: Map all, but hide ones far away? 
    // Best for "wrapping": Render a window relative to activeIndex.

    // Strategy: Render [Prev, Current, Next]
    // The visual order in flexbox is naturally 1, 2, 3. 
    // 2 is centered and active.

    const getVisibleTestimonials = () => {
        const total = testimonials.length;
        const prevIndex = (activeIndex - 1 + total) % total;
        const nextIndex = (activeIndex + 1) % total;

        return [
            { ...testimonials[prevIndex], status: 'prev' },
            { ...testimonials[activeIndex], status: 'active' },
            { ...testimonials[nextIndex], status: 'next' }
        ];
    };

    const visibleCards = getVisibleTestimonials();

    return (
        <section className="testimonials-section">
            <div
                className="testimonials-bg"
                style={{ backgroundImage: `url(${SITE_CONFIG.testimonialsBg})` }}
            ></div>

            <div className="testimonials-header">
                <h2>CLIENT TESTIMONIALS</h2>
                <span className="testimonials-subtitle">TRUSTED BY DALLAS' ELITE</span>
            </div>

            <div className="testimonials-viewport">
                <div className="testimonials-track">
                    {visibleCards.map((item) => (
                        <div
                            key={`${item.id}-${item.status}`} // Unique key for re-render animation
                            className={`testimonial-card ${item.status === 'active' ? 'active' : ''}`}
                        >
                            <div className="testimonial-initials">{item.initials}</div>
                            <div className="testimonial-type">{item.clientType}</div>
                            <p className="testimonial-text">"{item.text}"</p>
                            <button className="btn-read-more">READ MORE</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="testimonials-controls">
                <button className="control-btn" onClick={prevTestimonial} aria-label="Previous testimonial">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button className="control-btn" onClick={nextTestimonial} aria-label="Next testimonial">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Testimonials;
