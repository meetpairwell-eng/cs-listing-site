import React from 'react';
import './DesignEditorial.css';
import editorialImg from '../assets/editorial_dining.png';
import adLogo from '../assets/ad_logo_real.png';

const DesignEditorial = () => {
    return (
        <section className="design-editorial-section">
            <div className="editorial-split-container">
                {/* Left Side - Image */}
                <div className="editorial-image-side">
                    <img src={editorialImg} alt="Interior Design" />
                </div>

                {/* Right Side - Content */}
                <div className="editorial-content-side">
                    <div className="editorial-content-inner">
                        <span className="editorial-eyebrow">AS SEEN IN</span>

                        {/* Architectural Digest Logo */}
                        <div className="ad-logo-container">
                            <img src={adLogo} alt="Architectural Digest" className="ad-logo-img" />
                        </div>

                        <h2 className="editorial-headline">
                            Representing the most exceptional and architecturally significant homes.
                        </h2>

                        <a href="https://www.architecturaldigest.com/story/evan-shane-dallas-dwelling-marries-history-modernity-refreshing-ways" target="_blank" rel="noopener noreferrer" className="editorial-link-btn">
                            READ THE ARTICLE
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignEditorial;
