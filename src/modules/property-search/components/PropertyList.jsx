import PropertyCard from './PropertyCard';

const PropertyList = ({ listings, onPropertyClick, selectedListing }) => {
    return (
        <div className="property-list">
            <div className="property-list-header">
                <h3>{listings.length} Properties</h3>
                <p>Showing properties in current map view</p>
            </div>

            <div className="property-list-scroll">
                {listings.map(listing => (
                    <PropertyCard
                        key={listing.id}
                        listing={listing}
                        onClick={onPropertyClick}
                        isSelected={selectedListing?.id === listing.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
