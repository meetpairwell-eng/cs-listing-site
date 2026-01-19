import { Link } from 'react-router-dom';
import { getSoldListings } from '../data/listings';
import { SITE_CONFIG } from '../config';
import './FeaturedListings.css';

const FeaturedListings = () => {
    // Get sold listings and limit to 4 for display
    const listings = getSoldListings().slice(0, 4);

    const getMediaUrl = (filename) => {
        return `${SITE_CONFIG.mediaBaseUrl}/${filename}`;
    };

    return (
        <section id="listings" className="section listings-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>NOTABLE SALES</h2>
                </div>

                <div className="listings-grid">
                    {listings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            <div className="listing-image">
                                <img
                                    src={getMediaUrl(listing.heroImage)}
                                    alt={listing.title}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
                                    }}
                                />
                                <div className="listing-status">{listing.status}</div>
                            </div>

                            <div className="listing-content">
                                <h3 className="listing-title">{listing.title}</h3>
                                <p className="listing-address">{listing.address}</p>
                                <p className="listing-specs">
                                    {listing.specs.beds} BD | {listing.specs.baths} BA | {listing.specs.sqft} SQ.FT.
                                </p>
                                <div className="listing-price">{listing.price}</div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default FeaturedListings;
