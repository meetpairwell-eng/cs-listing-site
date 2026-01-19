import { useState, useCallback, useEffect } from 'react';
import PropertyList from './components/PropertyList';
import PropertyMapGoogle from './components/PropertyMapGoogle';
import PropertySearchHeader from './components/PropertySearchHeader';
import { fetchProperties } from '../../api/idxService';
import './PropertySearch.css';

const PropertySearch = () => {
    const [allListings, setAllListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [showMobileMap, setShowMobileMap] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter state
    const [filters, setFilters] = useState({
        listingType: 'buy', // 'buy' or 'rent'
        priceMin: '',
        priceMax: '',
        beds: 'Any',
        baths: 'Any',
        propertyTypes: []
    });

    // Load properties from SimplyRETS on mount
    useEffect(() => {
        const loadProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('🔍 Fetching properties from SimplyRETS...');

                // Fetch active properties (you can adjust these parameters)
                const properties = await fetchProperties({
                    status: 'Active',
                    limit: 100, // Get more properties for better search results
                    // You can add more filters here:
                    // cities: 'Dallas,Highland Park,University Park',
                    // minprice: 100000,
                    // maxprice: 10000000,
                });

                console.log('✅ Loaded', properties.length, 'properties from SimplyRETS');
                setAllListings(properties);
                setFilteredListings(properties);
            } catch (err) {
                console.error('❌ Error loading properties:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []); // Only run once on mount

    // Apply filters whenever they change
    useEffect(() => {
        if (allListings.length === 0) return;

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

    // Loading state
    if (loading) {
        return (
            <section className="property-search-section">
                <PropertySearchHeader
                    filters={filters}
                    onFiltersChange={setFilters}
                />
                <div className="property-search-container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '500px',
                    fontSize: '18px',
                    color: '#666'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem' }}>🔄 Loading properties from SimplyRETS...</div>
                        <div style={{ fontSize: '14px' }}>This may take a few moments</div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="property-search-section">
                <PropertySearchHeader
                    filters={filters}
                    onFiltersChange={setFilters}
                />
                <div className="property-search-container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '500px',
                    padding: '2rem'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        padding: '2rem',
                        background: '#ffebee',
                        borderRadius: '8px',
                        border: '1px solid #f44336'
                    }}>
                        <h3 style={{ color: '#d32f2f', marginBottom: '1rem' }}>❌ Error Loading Properties</h3>
                        <p style={{ marginBottom: '1rem' }}>{error}</p>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            <strong>Troubleshooting:</strong>
                            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                                <li>Check that your SimplyRETS API credentials are correct in .env.local</li>
                                <li>Verify you restarted the dev server after adding credentials</li>
                                <li>Try the demo credentials: simplyrets / simplyrets</li>
                                <li>Check the browser console for more details</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                background: '#4A5D4F',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="property-search-section">
            <PropertySearchHeader
                filters={filters}
                onFiltersChange={setFilters}
            />

            <div className="property-search-container">
                {/* Sidebar with listings */}
                <div className="property-search-sidebar">
                    <PropertyList
                        listings={filteredListings}
                        onPropertyClick={handlePropertyClick}
                        selectedListing={selectedListing}
                    />
                </div>

                {/* Map */}
                <div className="property-search-map">
                    <PropertyMapGoogle
                        listings={filteredListings}
                        selectedListing={selectedListing}
                        onMarkerClick={handlePropertyClick}
                        onMapMove={handleMapMove}
                    />
                </div>
            </div>
        </section>
    );
};

export default PropertySearch;
