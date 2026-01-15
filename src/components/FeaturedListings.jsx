import { Link } from 'react-router-dom';
import { mockListings } from '../modules/property-search/api/mockData';
import './FeaturedListings.css';

const FeaturedListings = () => {
    // Get first 3 sold properties
    const soldListings = mockListings
        .filter(listing => listing.status === 'Sold')
        .slice(0, 3);

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        }
        return `$${price.toLocaleString()}`;
    };

    return (
        <section id="listings" className="featured-listings">
            <div className="container">
                <h2 className="section-title">NOTABLE SALES</h2>

                <div className="listings-grid">
                    {soldListings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            <div className="listing-image">
                                <img src={listing.image} alt={listing.address} />
                                <div className="listing-status">{listing.status}</div>
                            </div>
                            <div className="listing-info">
                                <h3 className="listing-price">{formatPrice(listing.price)}</h3>
                                <p className="listing-address">{listing.address}</p>
                                <p className="listing-details">
                                    {listing.beds} BD | {listing.baths} BA | {listing.sqft.toLocaleString()} SQ.FT.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-all-container">
                    <Link to="/properties" className="btn-view-all">
                        VIEW ALL PROPERTIES
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedListings;
