import PropertyCard from './PropertyCard';

const PropertyList = ({ listings, onPropertyClick, selectedListing }) => {
    return (
        <>
            <div className="property-list-header">
                <h3>Real estate & homes for sale</h3>
                <p>{listings.length} results</p>
            </div>

            <div className="property-list-scroll">
                {listings.map((listing) => (
                    <PropertyCard
                        key={listing.id}
                        listing={listing}
                        onClick={onPropertyClick}
                        isSelected={selectedListing?.id === listing.id}
                    />
                ))}
            </div>
        </>
    );
};

export default PropertyList;
