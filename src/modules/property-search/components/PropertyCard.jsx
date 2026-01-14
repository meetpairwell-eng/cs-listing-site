const PropertyCard = ({ listing, onClick, isSelected }) => {
    return (
        <div
            className={`property-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick(listing)}
        >
            <div className="property-image">
                <img src={listing.image} alt={listing.address} />
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
