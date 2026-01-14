import { SITE_CONFIG } from '../config';
import './Contact.css';

const Contact = ({ onContactClick }) => {
    return (
        <section id="contact" className="contact-hero-section">
            <div className="contact-hero-overlay"></div>
            <div className="contact-hero-content">
                <h2 className="contact-hero-title">WORK WITH {SITE_CONFIG.agentName.split(' ')[0].toUpperCase()}</h2>
                <div className="contact-hero-divider"></div>
                <p className="contact-hero-text">
                    Get assistance in determining current property value, crafting a competitive offer,
                    writing and negotiating a contract, and much more. Contact {SITE_CONFIG.agentName.split(' ')[0]}
                    today to discuss all your real estate needs!
                </p>
                <button onClick={onContactClick} className="btn-contact-hero">
                    LET'S CONNECT
                </button>
            </div>
        </section>
    );
};

export default Contact;
