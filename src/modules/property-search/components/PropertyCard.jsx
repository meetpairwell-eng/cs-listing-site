import useFavorites from '../../../hooks/useFavorites';

const PropertyCard = ({ listing, onClick, isSelected }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(listing.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent card click
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
                <div className="property-price">{listing.priceFormatted}</div>
                <div className="property-address">
                    {listing.address}
                    <br />
                    {listing.city}, {listing.state} {listing.zipCode}
                </div>
                <div className="property-specs">
                    {listing.beds} BD | {listing.baths} BA | {listing.sqftFormatted} SQ.FT.
                </div>
                <div className="property-type">{listing.propertyType}</div>
            </div>
        </div>
    );
};

export default PropertyCard;
