import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config';
import ValuationModal from '../components/ValuationModal';
import heroImage from '../assets/valuation-hero.png';
import './HomeValuation.css';

const HomeValuation = ({ onContactClick }) => {
    const [address, setAddress] = useState('');
    const [openFaq, setOpenFaq] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);

    // Initialize Google Places Autocomplete
    useEffect(() => {
        if (!window.google || !inputRef.current) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'us' }
        });

        autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current.getPlace();
            if (place.formatted_address) {
                setAddress(place.formatted_address);
            }
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address.trim()) {
            setIsModalOpen(true);
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How accurate is the home valuation?",
            answer: "Our valuations combine comprehensive real-time market data with personalized expertise to deliver highly accurate estimates. We analyze recent comparable sales, current market conditions, property characteristics, and neighborhood trends. For the most precise valuation, we pair this data with a comprehensive market analysis from one of our expert agents who personally account for your home's unique features, recent renovations, and subtle market nuances to ensure you receive the most accurate assessment of your property's true value."
        },
        {
            question: "What factors affect my home's value?",
            answer: "Location is paramount—proximity to quality schools, shopping, parks, and employment hubs significantly impacts value. We carefully evaluate physical characteristics like square footage, bedrooms, bathrooms, lot size, and architectural style. Your property's condition, age, and recent upgrades are personally assessed. We analyze comparable sales in your neighborhood, current market trends, and local economic conditions. Additional factors include curb appeal, energy efficiency, smart home features, and outdoor living spaces. Our personalized analysis ensures all these elements are properly weighted for your specific property."
        },
        {
            question: "Is this service free?",
            answer: "Absolutely! Our home valuation service is completely free with zero obligations. We provide valuable, transparent insights to all homeowners, whether you're actively considering selling or simply curious about your property's value. There's no pressure to list with us. We offer this complimentary service because we're confident that once you experience our personalized approach and market expertise, you'll choose to work with us when you're ready to make your next move."
        },
        {
            question: "How often should I check my home's value?",
            answer: "We recommend checking your home's value quarterly to stay informed about market trends. However, for a truly accurate assessment, we'll reach out to discuss any recent updates or specific details about your home, as these personalized factors are the primary drivers of your property's current market value."
        },
        {
            question: "What happens after I submit my address?",
            answer: "As soon as you submit your information, our team is notified. One of our local experts will be contacting you shortly to get a detailed description of your home. This conversation is essential because the unique details you provide—such as recent high-end finishes or specific structural upgrades—majorly influence the final valuation and allow us to provide a far more accurate analysis than a generic estimate."
        },
        {
            question: "Do I need to provide access to my home for the valuation?",
            answer: "Physical access is not required for the initial valuation. We start by contacting you to gather a precise description of your property's features and condition. These details are critical and will majorly influence the accuracy of the evaluation. While a simple phone conversation often provides enough information for a detailed Comparative Market Analysis, we are always available for an in-person walkthrough if you prefer the most granular assessment possible."
        }
    ];

    return (
        <div className="home-valuation-page">
            {/* Hero Section */}
            <section className="hv-hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="hv-hero-overlay"></div>
                <div className="container hv-hero-content">
                    <h1 className="hv-hero-title">Discover Your Home's True Value</h1>
                    <p className="hv-hero-subtitle">Get an accurate valuation of your property in Dallas</p>

                    <form className="hv-search-form" onSubmit={handleSubmit}>
                        <div className="hv-search-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                className="hv-search-input"
                                placeholder="Enter your property address..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <button type="submit" className="hv-search-button">
                                Get Free Valuation
                            </button>
                        </div>
                    </form>

                    <ul className="hv-hero-benefits">
                        <li>✓ Personalized Results</li>
                        <li>✓ No Obligation</li>
                        <li>✓ Expert Analysis</li>
                    </ul>
                </div>
            </section>

            {/* Valuation Process Section */}
            <section className="hv-process">
                <div className="container">
                    <h2 className="hv-section-title">How we perform a valuation</h2>

                    <div className="hv-process-timeline">
                        <div className="hv-timeline-line"></div>

                        {/* Step 1 Item */}
                        <div className="hv-timeline-item cma">
                            <div className="hv-timeline-dot"></div>
                            <div className="hv-timeline-label">
                                <span className="label-box">Step 1</span>
                            </div>
                            <div className="hv-timeline-content">
                                <h3>The Discovery Consultation</h3>
                                <div className="hv-timeline-text">
                                    <p>
                                        Before we look at a single spreadsheet, we start with a brief conversation.
                                        We need to see your home through your eyes. While we’ll confirm the basics
                                        like square footage and bed/bath counts, our primary focus is on the
                                        "Value Multipliers" that set your property apart.
                                    </p>
                                    <p>Tell us about the features that don't show up in public records:</p>
                                    <ul className="hv-feature-list">
                                        <li><strong>Interior Refinement:</strong> Did you install custom white oak flooring or designer lighting in the gallery?</li>
                                        <li><strong>Invisible Upgrades:</strong> Have you invested in a high-efficiency HVAC system, smart home integration, or sound-dampening windows?</li>
                                        <li><strong>The Lifestyle Factor:</strong> Does your terrace offer a rare, unobstructed view of the park, or are you on the quietest cul-de-sac in the neighborhood?</li>
                                        <li><strong>Recent Renovations:</strong> From quartz waterfall islands to spa-grade primary baths, these are the details that drive competitive bids.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 Item */}
                        <div className="hv-timeline-item appraisal">
                            <div className="hv-timeline-dot"></div>
                            <div className="hv-timeline-label">
                                <span className="label-box">Step 2</span>
                            </div>
                            <div className="hv-timeline-content">
                                <h3>The Personalized Market Analysis</h3>
                                <p>
                                    Once we’ve documented what makes your home special, I perform a Detailed
                                    and Personalized CMA (Comparative Market Analysis). Unlike a generic
                                    algorithm, I manually cross-reference your home’s unique assets against
                                    the most recent premium sales and off-market data in the area. By
                                    adjusting for every "special detail" we discussed, I provide you with
                                    the most accurate valuation possible, a number you can actually use
                                    to strategize your next move.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Now more prominent */}
            <section className="hv-faq">
                <div className="container">
                    <h2 className="hv-section-title">Frequently Asked Questions</h2>
                    <p className="hv-faq-intro">
                        Everything you need to know about our home valuation service
                    </p>

                    <div className="hv-faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`hv-faq-item ${openFaq === index ? 'active' : ''}`}>
                                <button
                                    className="hv-faq-question"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="hv-faq-icon">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                {openFaq === index && (
                                    <div className="hv-faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Valuation Modal */}
            <ValuationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                propertyAddress={address}
            />
        </div>
    );
};

export default HomeValuation;
