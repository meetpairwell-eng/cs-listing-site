import { SITE_CONFIG } from '../../../config';

const PropertySearchHeader = () => {
    return (
        <div className="property-search-header">
            <div className="search-header-container">
                <div className="search-logo">
                    <span className="logo-initials">{SITE_CONFIG.agentInitials}</span>
                </div>

                <div className="search-input-wrapper">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="City, neighborhood, ZIP code..."
                    />
                </div>

                <div className="search-filters">
                    <button className="filter-btn">For sale</button>
                    <button className="filter-btn">Any price</button>
                    <button className="filter-btn">All property types</button>
                    <button className="filter-btn">All beds</button>
                    <button className="filter-btn">All baths</button>
                </div>
            </div>
        </div>
    );
};

export default PropertySearchHeader;
