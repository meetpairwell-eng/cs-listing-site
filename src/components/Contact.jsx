import { useState } from 'react';
import { SITE_CONFIG } from '../config';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertyType: 'buying'
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create mailto link with form data
        const subject = `Property Inquiry from ${formData.name}`;
        const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Interest: ${formData.propertyType}

Message:
${formData.message}
    `.trim();

        window.location.href = `mailto:${SITE_CONFIG.agentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="section contact-section section-dark">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Let's Connect</h2>
                        <p className="contact-intro">
                            Ready to find your dream home or sell your property? Get in touch today
                            and let's make it happen.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <a href={`mailto:${SITE_CONFIG.agentEmail}`}>{SITE_CONFIG.agentEmail}</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Location</h4>
                                    <p>Dallas, Texas</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Agency</h4>
                                    <p>{SITE_CONFIG.agency}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form onSubmit={handleSubmit} className="contact-form glass">
                            <h3>Send a Message</h3>

                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="propertyType">I'm interested in *</label>
                                <select
                                    id="propertyType"
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="buying">Buying a Property</option>
                                    <option value="selling">Selling a Property</option>
                                    <option value="both">Both Buying & Selling</option>
                                    <option value="consultation">General Consultation</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Tell me about your real estate needs..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-large">
                                {submitted ? 'Message Sent!' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
