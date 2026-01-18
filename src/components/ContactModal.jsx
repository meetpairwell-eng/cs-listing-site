import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [consent, setConsent] = useState(false);

    // Helper to get correct asset URL
    const getAssetUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('/') || path.startsWith('data:')) return path;
        return `${SITE_CONFIG.mediaBaseUrl}/${path}`;
    };

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!consent) {
            alert('Please agree to be contacted before submitting.');
            return;
        }

        // Create mailto link with form data
        const subject = encodeURIComponent('Contact Request from Website');
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        );

        window.location.href = `mailto:${SITE_CONFIG.agentEmail}?subject=${subject}&body=${body}`;

        // Close modal after submission
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'contact-modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="contact-modal-overlay" onClick={handleOverlayClick}>
            <div className="contact-modal">
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>

                <div className="modal-content-wrapper">
                    {/* Left Side - Contact Details */}
                    <div
                        className="modal-contact-details"
                        style={{
                            backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.85)), url(${SITE_CONFIG.modalBg})`
                        }}
                    >
                        <h2 className="modal-section-title">CONTACT DETAILS</h2>
                        <div className="modal-agent-info">
                            <p className="modal-agent-name">{SITE_CONFIG.agentName.toUpperCase()}</p>
                        </div>

                        <div className="modal-contact-item">
                            <div className="contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div className="contact-info">
                                <p className="contact-label">PHONE</p>
                                <a href={`tel:${SITE_CONFIG.agentPhone || ''}`} className="contact-value">
                                    {SITE_CONFIG.agentPhone || '(XXX) XXX-XXXX'}
                                </a>
                            </div>
                        </div>

                        <div className="modal-contact-item">
                            <div className="contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div className="contact-info">
                                <p className="contact-label">EMAIL</p>
                                <a href={`mailto:${SITE_CONFIG.agentEmail}`} className="contact-value">
                                    {SITE_CONFIG.agentEmail}
                                </a>
                            </div>
                        </div>

                        <div className="modal-contact-item">
                            <div className="contact-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div className="contact-info">
                                <p className="contact-label">ADDRESS</p>
                                <p className="contact-value">
                                    {SITE_CONFIG.agentAddress || 'Dallas, TX'}
                                </p>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        {SITE_CONFIG.socialMedia && (
                            <div className="modal-social-icons">
                                {SITE_CONFIG.socialMedia.facebook && (
                                    <a href={SITE_CONFIG.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                )}
                                {SITE_CONFIG.socialMedia.instagram && (
                                    <a href={SITE_CONFIG.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                )}
                                {SITE_CONFIG.socialMedia.linkedin && (
                                    <a href={SITE_CONFIG.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                )}
                                {SITE_CONFIG.socialMedia.zillow && (
                                    <a href={SITE_CONFIG.socialMedia.zillow} target="_blank" rel="noopener noreferrer" className="social-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Submit Form */}
                    <div className="modal-form-section">
                        <h2 className="modal-section-title">SUBMIT A MESSAGE</h2>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">NAME</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">PHONE</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">MESSAGE</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                ></textarea>
                            </div>

                            <div className="form-consent">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    required
                                />
                                <label htmlFor="consent">
                                    I agree to be contacted by {SITE_CONFIG.agentName} via call, email, and text for real estate services.
                                    To opt out, reply 'stop' at any time or reply 'help' for assistance. You can also click the unsubscribe link in the emails.
                                    Message and data rates may apply. Message frequency may vary. <Link to="/privacy-policy" className="privacy-policy-link">Privacy Policy</Link>.
                                </label>
                            </div>

                            <button type="submit" className="btn-submit-form">
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
