import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config';
import ValuationModal from '../components/ValuationModal';
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
            answer: "Our valuations leverage cutting-edge algorithms combined with comprehensive real-time market data to deliver highly accurate estimates. We analyze thousands of data points including recent comparable sales, current market conditions, property characteristics, and neighborhood trends. While our automated valuation provides an excellent starting point, we recommend scheduling a comprehensive market analysis with one of our expert agents for the most precise valuation. Our agents can account for unique property features, recent renovations, and subtle market nuances that automated systems may not fully capture, ensuring you receive the most accurate assessment of your home's true market value."
        },
        {
            question: "What factors affect my home's value?",
            answer: "Your home's value is influenced by a complex interplay of numerous factors. Location remains paramount—proximity to quality schools, shopping centers, parks, and employment hubs significantly impacts value. Physical characteristics including square footage, number of bedrooms and bathrooms, lot size, and architectural style play crucial roles. The property's condition, age, and any recent upgrades or renovations are carefully considered. We also analyze comparable sales in your neighborhood, current market trends, local economic conditions, and seasonal fluctuations. Additional factors include curb appeal, energy efficiency features, smart home technology, outdoor living spaces, and even the quality of local amenities and community services. Our comprehensive analysis ensures all these elements are properly weighted to provide you with an accurate valuation."
        },
        {
            question: "Is this service free?",
            answer: "Absolutely! Our home valuation service is completely free with zero obligations or hidden fees. We believe in providing valuable, transparent insights to all homeowners, whether you're actively considering selling, planning for the future, or simply curious about your property's current market value. There's no pressure to list with us, and you're welcome to use this information however you see fit. We offer this complimentary service because we're confident that once you experience our expertise and personalized approach, you'll choose to work with us when you're ready to make your next move. Think of it as our way of demonstrating the quality of service and market knowledge we bring to every client relationship."
        },
        {
            question: "How often should I check my home's value?",
            answer: "We recommend checking your home's value quarterly to stay well-informed about market trends and your property's appreciation trajectory. Regular monitoring helps you understand seasonal fluctuations and long-term value trends in your neighborhood. However, if you're actively considering selling within the next 6-12 months, monthly valuations can be beneficial to help identify the optimal listing window when market conditions are most favorable. Additionally, you should request a new valuation after completing any significant renovations or improvements, as these can substantially impact your home's worth. Major market events, changes in local zoning, new developments in your area, or shifts in interest rates are also good triggers for requesting an updated valuation to ensure you have the most current information."
        },
        {
            question: "What happens after I submit my address?",
            answer: "Once you submit your address and contact information, our advanced valuation system immediately begins analyzing your property using our proprietary algorithms and comprehensive market database. Within moments, you'll receive an initial automated estimate. Following this, one of our experienced local real estate agents will personally review your property details and prepare a comprehensive Comparative Market Analysis (CMA). This detailed report will include recent comparable sales in your neighborhood, active competing listings, market absorption rates, and current pricing trends. Your dedicated agent will then reach out to you—typically within 24 hours—to discuss the findings, answer any questions, and provide expert insights about your local market conditions. There's absolutely no obligation, and our agents are here to provide valuable information and guidance, whether you're planning to sell immediately or simply exploring your options for the future."
        },
        {
            question: "How long does it take to receive my valuation?",
            answer: "You'll receive an instant preliminary estimate as soon as you complete the form. This automated valuation provides an immediate baseline understanding of your property's worth based on current market data and comparable sales. For a more detailed and personalized Comparative Market Analysis (CMA), one of our expert agents will contact you within 24 business hours. This comprehensive analysis takes into account the unique features of your property, recent market activity, and local trends that automated systems might miss. If you need expedited service or have specific timing requirements, please let us know in your submission, and we'll do our best to accommodate your schedule."
        },
        {
            question: "Do I need to provide access to my home for the valuation?",
            answer: "No, you don't need to provide physical access to your home for the initial valuation. Our automated system and Comparative Market Analysis can provide accurate estimates based on public records, recent comparable sales, and property data. However, if you'd like the most precise valuation possible, we recommend scheduling an optional in-person assessment. A brief walkthrough allows our agents to note unique features, recent upgrades, condition details, and other value-adding elements that may not be reflected in public records. This personalized approach typically results in a more accurate valuation and provides you with specific recommendations for maximizing your home's value before listing."
        }
    ];

    return (
        <div className="home-valuation-page">
            {/* Hero Section */}
            <section className="hv-hero">
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
                    <p className="hv-process-subtitle">Two Accurate Ways to Perform Home Valuations</p>

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

            {/* CTA Section */}
            <section className="hv-cta">
                <div className="container">
                    <h2 className="hv-cta-title">Ready to Discover Your Home's Value?</h2>
                    <p className="hv-cta-text">Get started with your free, no-obligation home valuation today</p>
                    <button className="hv-cta-button" onClick={() => setIsModalOpen(true)}>
                        Get Your Free Valuation
                    </button>
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
