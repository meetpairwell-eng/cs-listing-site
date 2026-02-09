import { Link } from 'react-router-dom';
import { getNotableSales } from '../data/listingsService';
import { SITE_CONFIG } from '../config';
import OptimizedImage from './common/OptimizedImage';
import './FeaturedListings.css';

const FeaturedListings = () => {
    // Get notable sales (manually curated featured properties)
    const listings = getNotableSales(4);

    return (
        <section id="listings" className="section listings-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>NOTABLE SALES</h2>
                </div>

                <div className="listings-grid">
                    {listings.map((listing) => (
                        <Link
                            key={listing.id}
                            to={`/property/${listing.id}`}
                            className="listing-card"
                        >
                            <div className="listing-image">
                                <OptimizedImage
                                    src={listing.heroImage}
                                    alt={listing.title}
                                    width={800}
                                />
                                <div className="listing-status">{listing.status}</div>
                                {listing.customBadge && (
                                    <div className="listing-badge">{listing.customBadge}</div>
                                )}
                            </div>

                            <div className="listing-content">
                                <h3 className="listing-title">{listing.title}</h3>
                                <p className="listing-address">{listing.address}</p>
                                <p className="listing-specs">
                                    {listing.specs.beds} BD | {listing.specs.baths} BA | {listing.specs.sqft} SQ.FT.
                                </p>
                                <div className="listing-price">{listing.price}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedListings;
