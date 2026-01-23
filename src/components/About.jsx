import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="about-split-layout">
                {/* Left Side - Parallax Image */}
                <div
                    className="about-image-side"
                    style={{ backgroundImage: `url(${SITE_CONFIG.mediaBaseUrl}/${SITE_CONFIG.headshot})` }}
                ></div>

                {/* Right Side - Content */}
                <div className="about-content-side">
                    <div className="about-content-wrapper">
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
