import { SITE_CONFIG } from '../config';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image">
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                            alt={SITE_CONFIG.agentName}
                        />
                    </div>

                    <div className="about-content">
                        <h2>MEET {SITE_CONFIG.agentName.split(' ')[0].toUpperCase()}</h2>

                        <p className="about-label">LUXURY ESTATES AGENT</p>

                        <p>
                            {SITE_CONFIG.agentName} brings an abundance of personal real estate experience and solid business
                            background to each transaction. Raised in a real estate family, he specializes in
                            recognizing opportunities and forecasting emerging trends in various neighborhood
                            markets in Dallas.
                        </p>

                        <p>
                            Cole offers a thorough, hands-on approach to real estate that is discerning and
                            collaborative. Cole knows the importance of assembling a great team that
                            understands your goals.
                        </p>

                        <p className="about-license">{SITE_CONFIG.agentName} | {SITE_CONFIG.agentLicense}</p>

                        <a href="#contact" className="btn-minimal">
                            LEARN MORE
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
