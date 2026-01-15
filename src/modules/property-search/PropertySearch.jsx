import { useState, useCallback, useEffect } from 'react';
import PropertyList from './components/PropertyList';
import PropertyMapGoogle from './components/PropertyMapGoogle';
import PropertySearchHeader from './components/PropertySearchHeader';
import { mockListings, filterListingsByBounds } from './api/mockData';
import './PropertySearch.css';

const PropertySearch = () => {
    const [allListings] = useState(mockListings);
    const [filteredListings, setFilteredListings] = useState(mockListings);
    const [selectedListing, setSelectedListing] = useState(null);
    const [showMobileMap, setShowMobileMap] = useState(false);

    // Filter state
    const [filters, setFilters] = useState({
        listingType: 'buy', // 'buy' or 'rent'
        priceMin: '',
        priceMax: '',
        beds: 'Any',
        baths: 'Any',
        propertyTypes: []
    });

    // Apply filters whenever they change
    useEffect(() => {
        console.log('Applying filters:', filters);
        let filtered = [...allListings];
        console.log('Starting with', filtered.length, 'listings');

        // Filter by beds
        if (filters.beds !== 'Any') {
            const bedsNum = filters.beds === 'Studio' ? 0 : filters.beds === '5+' ? 5 : parseInt(filters.beds);
            filtered = filtered.filter(listing => {
                if (filters.beds === '5+') return listing.beds >= 5;
                return listing.beds === bedsNum;
            });
            console.log('After beds filter:', filtered.length, 'listings');
        }

        // Filter by baths
        if (filters.baths !== 'Any') {
            const bathsNum = filters.baths === '5+' ? 5 : parseInt(filters.baths);
            filtered = filtered.filter(listing => {
                if (filters.baths === '5+') return listing.baths >= 5;
                return listing.baths >= bathsNum;
            });
            console.log('After baths filter:', filtered.length, 'listings');
        }

        // Filter by price
        if (filters.priceMin) {
            const minPrice = parseInt(filters.priceMin.replace(/[^0-9]/g, ''));
            if (!isNaN(minPrice)) {
                filtered = filtered.filter(listing => listing.price >= minPrice);
                console.log('After min price filter:', filtered.length, 'listings');
            }
        }
        if (filters.priceMax) {
            const maxPrice = parseInt(filters.priceMax.replace(/[^0-9]/g, ''));
            if (!isNaN(maxPrice)) {
                filtered = filtered.filter(listing => listing.price <= maxPrice);
                console.log('After max price filter:', filtered.length, 'listings');
            }
        }

        console.log('Final filtered count:', filtered.length);
        setFilteredListings(filtered);
    }, [filters, allListings]);

    // Handle map movement - filter listings by visible bounds
    const handleMapMove = useCallback((bounds) => {
        // Disabled to maintain initial Dallas center
        // const filtered = filterListingsByBounds(allListings, bounds);
        // setFilteredListings(filtered);
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
            <PropertySearchHeader filters={filters} onFiltersChange={setFilters} />
            <div className={`property-search-container ${showMobileMap ? 'mobile-view-map' : 'mobile-view-list'}`}>
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

                <button
                    className="mobile-map-toggle"
                    onClick={() => setShowMobileMap(!showMobileMap)}
                >
                    {showMobileMap ? 'List View' : 'View Map'}
                </button>
            </div>
        </section>
    );
};

export default PropertySearch;
