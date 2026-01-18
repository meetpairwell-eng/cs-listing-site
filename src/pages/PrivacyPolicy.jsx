import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-page">
            <div className="privacy-hero">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last Updated: January 18, 2026</p>
                </div>
            </div>

            <div className="container">
                <div className="privacy-content">

                    <section className="privacy-section">
                        <h2>1. The Information We Collect</h2>
                        <p>We collect information that allows us to provide a high-precision valuation of your property. This includes:</p>
                        <ul>
                            <li><strong>Contact Details:</strong> Your name, email, and phone number provided through our forms.</li>
                            <li><strong>Property Data:</strong> Your address and the specific details you share during our "Discovery Consultation" (e.g., upgrades, flooring, views, and renovations).</li>
                            <li><strong>Technical Data:</strong> We use Umami Analytics, a privacy-focused tool, to understand how visitors use our site. This does not track you across the web or collect personal identifiers.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>2. How We Use Your Data</h2>
                        <p>Your data is used exclusively to fulfill the service you requested:</p>
                        <ul>
                            <li><strong>Precision Valuations:</strong> To perform a manual, tailored Comparative Market Analysis (CMA).</li>
                            <li><strong>Automated Follow-ups:</strong> We use n8n and Twilio to send you the results of your valuation and follow-up communications via SMS or email.</li>
                            <li><strong>Service Improvements:</strong> To ensure our website functions correctly on your device.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>3. Data Sharing & Third Parties</h2>
                        <p>We do not sell your data. We only share information with the essential service providers required to operate our business:</p>
                        <ul>
                            <li><strong>Communication:</strong> Twilio (for SMS) and our email delivery partners.</li>
                            <li><strong>Storage & Infrastructure:</strong> Hostinger (hosting) and Cloudflare R2 (secure asset storage).</li>
                            <li><strong>Legal Compliance:</strong> Only if required by law to respond to a valid legal request.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>4. Your Control & Opt-Out Rights</h2>
                        <p>You have full control over the information you share with us:</p>
                        <ul>
                            <li><strong>SMS:</strong> Reply "STOP" to any text message to immediately opt out of our automated follow-up system.</li>
                            <li><strong>Email:</strong> Use the "Unsubscribe" link in any email to be removed from our list.</li>
                            <li><strong>Data Deletion:</strong> You may contact us at any time to request that your personal information or property data be permanently deleted from our records.</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>5. Security</h2>
                        <p>We employ industry-standard safeguards, including SSL encryption and secure environment variables for API keys, to protect your data from unauthorized access. While no system is 100% secure, we prioritize the integrity of your personal information.</p>
                    </section>

                    <section className="privacy-section">
                        <h2>6. Contact Us</h2>
                        <p>For questions regarding this policy or to exercise your data rights, please contact:</p>
                        <p className="contact-info">
                            <strong>Cole Swearingen</strong><br />
                            Email: <a href="mailto:cole.swearingen@compass.com">cole.swearingen@compass.com</a><br />
                            Phone: <a href="tel:+12149271313">(214) 927-1313</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
