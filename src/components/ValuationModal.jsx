import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import './ValuationModal.css';

const ValuationModal = ({ isOpen, onClose, propertyAddress }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        termsAccepted: false
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Initialize map when modal opens and address is present
            if (window.google && propertyAddress) {
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address: propertyAddress }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        const map = new window.google.maps.Map(document.getElementById('valuation-modal-map'), {
                            center: results[0].geometry.location,
                            zoom: 16,
                            styles: [
                                {
                                    "featureType": "all",
                                    "elementType": "labels.text.fill",
                                    "stylers": [{ "color": "#999999" }, { "weight": 0.3 }]
                                },
                                {
                                    "featureType": "all",
                                    "elementType": "labels.text.stroke",
                                    "stylers": [{ "visibility": "off" }]
                                },
                                {
                                    "featureType": "road",
                                    "elementType": "labels.text.fill",
                                    "stylers": [{ "color": "#666666" }, { "weight": 0.4 }]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "labels.text",
                                    "stylers": [{ "weight": 0.2 }]
                                }
                            ],
                            disableDefaultUI: true,
                        });
                        new window.google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: propertyAddress
                        });
                    }
                });
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, propertyAddress]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(SITE_CONFIG.n8nWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    property: "Cole Website",
                    searchedAddress: propertyAddress,
                    source: 'Valuation Request',
                    timestamp: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setStatus('success');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    termsAccepted: false
                });

                // Close modal after 3 seconds
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Valuation submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="valuation-modal-overlay" onClick={onClose}>
            <div className="valuation-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="valuation-modal-close" onClick={onClose}>
                    <span>×</span>
                </button>

                <div className="valuation-modal-grid">
                    {/* Left Side - Form */}
                    <div className="valuation-modal-left">
                        <button className="valuation-back-btn" onClick={onClose}>
                            ← Back to search
                        </button>

                        <h2 className="valuation-modal-title">Get Your Personalized Home Valuation</h2>
                        <p className="valuation-modal-subtitle">
                            Enter your details to see how much your home is worth.
                        </p>

                        {status === 'success' ? (
                            <div className="valuation-success-message">
                                <div className="success-icon">✓</div>
                                <h3>Valuation Request Received</h3>
                                <p>
                                    Thank you for your request. {SITE_CONFIG.agentName.split(' ')[0]} will manually review the data for <strong>{propertyAddress}</strong> and send your personalized valuation shortly.
                                </p>
                            </div>
                        ) : (
                            <form className="valuation-form" onSubmit={handleSubmit}>
                                <div className="valuation-form-group">
                                    <label htmlFor="name">Full Name*</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="valuation-form-group">
                                    <label htmlFor="email">Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="valuation-form-group">
                                    <label htmlFor="phone">Phone*</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        pattern="[0-9\-\(\)+\.\+ ]{5,}"
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                <div className="valuation-form-checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                            required
                                            disabled={status === 'submitting'}
                                        />
                                        <span>
                                            I agree to be contacted by {SITE_CONFIG.agentName} via call, email, and text for real estate services.
                                            To opt out, reply 'stop' at any time or reply 'help' for assistance. You can also click the unsubscribe link in the emails.
                                            Message and data rates may apply. Message frequency may vary. <Link to="/privacy-policy" className="privacy-policy-link">Privacy Policy</Link>.
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" className="valuation-submit-btn" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Processing...' : 'Unlock Your Free Valuation'}
                                </button>

                                {status === 'error' && (
                                    <p className="valuation-error-message">Something went wrong. Please try again or contact us directly.</p>
                                )}

                                <div className="valuation-benefits">
                                    <div className="valuation-benefit-item">
                                        <span className="benefit-check">✓</span> Personalized Result
                                    </div>
                                    <div className="valuation-benefit-item">
                                        <span className="benefit-check">✓</span> Sell for More
                                    </div>
                                    <div className="valuation-benefit-item">
                                        <span className="benefit-check">✓</span> Get Expert Advice
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Right Side - Property Info */}
                    <div className="valuation-modal-right">
                        <div className="valuation-property-card">
                            <h3 className="valuation-property-title">Valuation Process</h3>

                            <div className="valuation-property-section">
                                <label>Property Address</label>
                                <p className="valuation-address">{propertyAddress || 'Enter an address to begin'}</p>
                            </div>

                            {propertyAddress && (
                                <div id="valuation-modal-map" className="valuation-map-container">
                                    <div className="map-loading">Map Loading...</div>
                                </div>
                            )}

                            <div className="valuation-info-section">
                                <h4>How we perform a valuation</h4>
                                <p>
                                    Our valuation process goes beyond generic algorithms. We start with a Discovery Consultation
                                    to understand your home's unique "Value Multipliers" like custom finishes, invisible upgrades,
                                    and lifestyle factors. Then, we perform a Personalized Market Analysis, manually
                                    cross-referencing your home's unique assets against the most recent premium sales
                                    and off-market data in the area to provide the most accurate valuation possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuationModal;
