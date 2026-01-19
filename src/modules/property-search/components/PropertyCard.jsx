import { Link } from 'react-router-dom';
import useFavorites from '../../../hooks/useFavorites';

const PropertyCard = ({ listing, onClick, isSelected }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(listing.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(listing.id);
    };

    return (
        <div
            className={`property-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick(listing)}
            id={`property-${listing.id}`}
        >
            <div className="property-image">
                <img src={listing.image} alt={listing.address} />
                <button
                    className={`favorite-btn ${favorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    ♥
                </button>
                <div className="property-status">{listing.status}</div>
            </div>

            <div className="property-details">
                <div className="property-header-row">
                    <div className="property-price">{listing.priceFormatted}</div>
                    <Link
                        to={`/property/${listing.id}`}
                        className="view-details-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        View Details →
                    </Link>
                </div>
                <div className="property-specs">
                    {listing.beds} bd · {listing.baths} ba · {listing.sqftFormatted} sqft
                </div>
                <div className="property-address">
                    {listing.address}
                </div>
                <div className="property-mls">
                    MLS®: {listing.mlsId || 'N/A'}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
