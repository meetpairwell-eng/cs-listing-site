import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image">
                        <img
                            src={`${SITE_CONFIG.mediaBaseUrl}/${SITE_CONFIG.headshot}`}
                            alt={SITE_CONFIG.agentName}
                        />
                    </div>

                    <div className="about-content">
                        <h2>MEET {SITE_CONFIG.agentName.split(' ')[0].toUpperCase()}</h2>

                        <p className="about-label">LUXURY ESTATES AGENT</p>

                        <p>
                            {SITE_CONFIG.agentName} brings a wealth of real estate expertise and a proven track record
                            to every transaction. With deep roots in the Dallas market, he excels at identifying
                            prime opportunities and anticipating emerging trends across the city's diverse neighborhoods.
                        </p>

                        <p>
                            {SITE_CONFIG.agentName.split(' ')[0]} delivers a meticulous, client-focused approach to real estate
                            that is both strategic and personalized. {SITE_CONFIG.agentName.split(' ')[0]} understands that
                            success requires more than expertise—it demands assembling the right team to bring your vision to life.
                        </p>

                        <Link to="/about-cole" className="btn-minimal">
                            LEARN MORE
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
