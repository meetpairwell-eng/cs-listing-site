import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../../../config';
import FilterModal from './FilterModal';

const PropertySearchHeader = ({ filters, onFiltersChange }) => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places || !searchInputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: 'us' }
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Selected place:', place);
        });
    }, []);

    const getFilterLabel = (key) => {
        if (!filters) return 'Loading...';

        if (key === 'listingType') return filters.listingType === 'buy' ? 'For sale' : 'For rent';
        if (key === 'price') {
            if (filters.priceMin && filters.priceMax) return `${filters.priceMin} - ${filters.priceMax}`;
            if (filters.priceMin) return `${filters.priceMin}+`;
            if (filters.priceMax) return `Up to ${filters.priceMax}`;
            return 'Any price';
        }
        if (key === 'beds') return filters.beds === 'Any' ? 'All beds' : `${filters.beds} beds`;
        if (key === 'baths') return filters.baths === 'Any' ? 'All baths' : `${filters.baths} baths`;
        if (key === 'propertyTypes') return 'All property types';
    };

    const toggleDropdown = (dropdown) => {
        console.log('Toggle dropdown clicked:', dropdown, 'Current:', activeDropdown);
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && !event.target.closest('.filter-dropdown-container')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

    return (
        <div className="property-search-header">
            <div className="search-bar-container">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    ref={searchInputRef}
                    type="text"
                    className="search-input"
                    placeholder="City, neighborhood, ZIP code..."
                />
            </div>

            <div className="filter-pills">
                {/* Listing Type Dropdown */}
                <div className="filter-dropdown-container">
                    <button className="filter-pill" onClick={() => toggleDropdown('listingType')}>
                        {getFilterLabel('listingType')}
                    </button>
                    {activeDropdown === 'listingType' && filters && (
                        <div className="filter-dropdown">
                            <button
                                className={`dropdown-option ${filters.listingType === 'buy' ? 'active' : ''}`}
                                onClick={() => { onFiltersChange({ ...filters, listingType: 'buy' }); setActiveDropdown(null); }}
                            >
                                For sale
                            </button>
                            <button
                                className={`dropdown-option ${filters.listingType === 'rent' ? 'active' : ''}`}
                                onClick={() => { onFiltersChange({ ...filters, listingType: 'rent' }); setActiveDropdown(null); }}
                            >
                                For rent
                            </button>
                        </div>
                    )}
                </div>

                {/* Price Dropdown */}
                <div className="filter-dropdown-container">
                    <button className="filter-pill" onClick={() => toggleDropdown('price')}>
                        {getFilterLabel('price')}
                    </button>
                    {activeDropdown === 'price' && filters && (
                        <div className="filter-dropdown price-dropdown">
                            <div className="price-inputs-inline">
                                <input
                                    type="text"
                                    placeholder="No min"
                                    value={filters.priceMin}
                                    onChange={(e) => onFiltersChange({ ...filters, priceMin: e.target.value })}
                                />
                                <span>to</span>
                                <input
                                    type="text"
                                    placeholder="No max"
                                    value={filters.priceMax}
                                    onChange={(e) => onFiltersChange({ ...filters, priceMax: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button className="filter-pill" onClick={() => setShowFilterModal(true)}>
                    {getFilterLabel('propertyTypes')}
                </button>

                {/* Beds Dropdown */}
                <div className="filter-dropdown-container">
                    <button className="filter-pill" onClick={() => toggleDropdown('beds')}>
                        {getFilterLabel('beds')}
                    </button>
                    {activeDropdown === 'beds' && filters && (
                        <div className="filter-dropdown beds-dropdown">
                            {['Any', 'Studio', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    className={`dropdown-pill ${filters.beds === opt ? 'active' : ''}`}
                                    onClick={() => { onFiltersChange({ ...filters, beds: opt }); setActiveDropdown(null); }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Baths Dropdown */}
                <div className="filter-dropdown-container">
                    <button className="filter-pill" onClick={() => toggleDropdown('baths')}>
                        {getFilterLabel('baths')}
                    </button>
                    {activeDropdown === 'baths' && filters && (
                        <div className="filter-dropdown baths-dropdown">
                            {['Any', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    className={`dropdown-pill ${filters.baths === opt ? 'active' : ''}`}
                                    onClick={() => { onFiltersChange({ ...filters, baths: opt }); setActiveDropdown(null); }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="header-actions">
                <button className="action-btn">List</button>
                <button className="action-btn">Map</button>
                <button className="action-btn primary" onClick={() => setShowFilterModal(true)}>
                    All filters
                </button>
                <button className="action-btn save">Save search</button>
            </div>

            <FilterModal
                isOpen={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                filters={filters}
                onFiltersChange={onFiltersChange}
            />
        </div>
    );
};

export default PropertySearchHeader;
