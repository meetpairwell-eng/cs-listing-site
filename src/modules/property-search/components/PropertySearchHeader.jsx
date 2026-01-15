import { useState, useEffect, useRef } from 'react';
import FilterModal from './FilterModal';
import './PropertySearchHeader.css';

const PropertySearchHeader = ({ filters, onFiltersChange }) => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(null);
    const searchInputRef = useRef(null);

    // Simple search functionality - filter by address/city
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 2) {
            // This would filter listings - for now just log
            console.log('Searching for:', searchTerm);
            // TODO: Connect to parent component to filter listings
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (openFilter && !e.target.closest('.filter-dropdown-wrapper')) {
                setOpenFilter(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openFilter]);

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

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
        return 'All property types';
    };

    return (
        <div className="property-search-header">
            {/* Search Bar */}
            <div className="search-bar-container">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    ref={searchInputRef}
                    type="text"
                    className="search-input"
                    placeholder="Search by city or address..."
                    onChange={handleSearch}
                />
            </div>

            {/* Filter Pills */}
            <div className="filter-pills">
                {/* For Sale/Rent */}
                <div className="filter-dropdown-wrapper">
                    <button
                        className="filter-pill"
                        onClick={() => toggleFilter('listingType')}
                    >
                        {getFilterLabel('listingType')}
                    </button>
                    {openFilter === 'listingType' && filters && (
                        <div className="filter-dropdown">
                            <button
                                className={`dropdown-option ${filters.listingType === 'buy' ? 'active' : ''}`}
                                onClick={() => {
                                    onFiltersChange({ ...filters, listingType: 'buy' });
                                    setOpenFilter(null);
                                }}
                            >
                                For sale
                            </button>
                            <button
                                className={`dropdown-option ${filters.listingType === 'rent' ? 'active' : ''}`}
                                onClick={() => {
                                    onFiltersChange({ ...filters, listingType: 'rent' });
                                    setOpenFilter(null);
                                }}
                            >
                                For rent
                            </button>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="filter-dropdown-wrapper">
                    <button
                        className="filter-pill"
                        onClick={() => toggleFilter('price')}
                    >
                        {getFilterLabel('price')}
                    </button>
                    {openFilter === 'price' && filters && (
                        <div className="filter-dropdown price-dropdown">
                            <div className="price-inputs-inline">
                                <input
                                    type="text"
                                    placeholder="No min"
                                    value={filters.priceMin || ''}
                                    onChange={(e) => onFiltersChange({ ...filters, priceMin: e.target.value })}
                                />
                                <span>to</span>
                                <input
                                    type="text"
                                    placeholder="No max"
                                    value={filters.priceMax || ''}
                                    onChange={(e) => onFiltersChange({ ...filters, priceMax: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Property Types */}
                <div className="filter-dropdown-wrapper">
                    <button
                        className="filter-pill"
                        onClick={() => toggleFilter('propertyTypes')}
                    >
                        {filters?.propertyTypes?.length > 0
                            ? `${filters.propertyTypes.length} property type${filters.propertyTypes.length > 1 ? 's' : ''}`
                            : 'All property types'}
                    </button>
                    {openFilter === 'propertyTypes' && filters && (
                        <div className="filter-dropdown property-types-dropdown">
                            {['Home', 'Condo', 'Townhome', 'Land', 'Multi-family'].map(type => (
                                <button
                                    key={type}
                                    className={`dropdown-pill ${filters.propertyTypes?.includes(type) ? 'active' : ''}`}
                                    onClick={() => {
                                        const current = filters.propertyTypes || [];
                                        const updated = current.includes(type)
                                            ? current.filter(t => t !== type)
                                            : [...current, type];
                                        onFiltersChange({ ...filters, propertyTypes: updated });
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Beds */}
                <div className="filter-dropdown-wrapper">
                    <button
                        className="filter-pill"
                        onClick={() => toggleFilter('beds')}
                    >
                        {getFilterLabel('beds')}
                    </button>
                    {openFilter === 'beds' && filters && (
                        <div className="filter-dropdown beds-dropdown">
                            {['Any', 'Studio', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    className={`dropdown-pill ${filters.beds === opt ? 'active' : ''}`}
                                    onClick={() => {
                                        onFiltersChange({ ...filters, beds: opt });
                                        setOpenFilter(null);
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Baths */}
                <div className="filter-dropdown-wrapper">
                    <button
                        className="filter-pill"
                        onClick={() => toggleFilter('baths')}
                    >
                        {getFilterLabel('baths')}
                    </button>
                    {openFilter === 'baths' && filters && (
                        <div className="filter-dropdown baths-dropdown">
                            {['Any', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    className={`dropdown-pill ${filters.baths === opt ? 'active' : ''}`}
                                    onClick={() => {
                                        onFiltersChange({ ...filters, baths: opt });
                                        setOpenFilter(null);
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
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
