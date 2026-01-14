import { useState, useCallback } from 'react';
import PropertyList from './components/PropertyList';
import PropertyMapGoogle from './components/PropertyMapGoogle';
import PropertySearchHeader from './components/PropertySearchHeader';
import { mockListings, filterListingsByBounds } from './api/mockData';
import './PropertySearch.css';

const PropertySearch = () => {
    const [allListings] = useState(mockListings);
    const [filteredListings, setFilteredListings] = useState(mockListings);
    const [selectedListing, setSelectedListing] = useState(null);

    // Handle map movement - filter listings by visible bounds
    const handleMapMove = useCallback((bounds) => {
        const filtered = filterListingsByBounds(allListings, bounds);
        setFilteredListings(filtered);
    }, [allListings]);

    // Handle property card click - fly to location on map
    const handlePropertyClick = useCallback((listing) => {
        setSelectedListing(listing);
    }, []);

    // Handle marker click - select property in sidebar
    const handleMarkerClick = useCallback((listing) => {
        setSelectedListing(listing);
        // Scroll to property in sidebar
        const element = document.getElementById(`property-${listing.id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, []);

    return (
        <section className="property-search-section">
            <PropertySearchHeader />
            <div className="property-search-container">
                <div className="property-search-sidebar">
                    <PropertyList
                        listings={filteredListings}
                        onPropertyClick={handlePropertyClick}
                        selectedListing={selectedListing}
                    />
                </div>

                <div className="property-search-map">
                    <PropertyMapGoogle
                        listings={filteredListings}
                        onMapMove={handleMapMove}
                        onMarkerClick={handleMarkerClick}
                        selectedListing={selectedListing}
                    />
                </div>
            </div>
        </section>
    );
};

export default PropertySearch;
