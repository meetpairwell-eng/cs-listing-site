import React, { useEffect, useRef } from 'react';
import './FilterModal.css';

const FilterModal = ({ isOpen, onClose, filters, onFiltersChange }) => {
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !window.google || !window.google.maps || !window.google.maps.places) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
            types: ['geocode'],
            componentRestrictions: { country: 'us' }
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Selected place:', place);
        });
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFilterChange = (key, value) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    // Format price with $ and commas
    const formatPrice = (value) => {
        if (!value) return '';
        const numericValue = value.replace(/[^0-9]/g, '');
        if (!numericValue) return '';
        return '$' + parseInt(numericValue).toLocaleString();
    };

    const handlePriceChange = (field, value) => {
        const formatted = formatPrice(value);
        handleFilterChange(field, formatted);
    };

    // Handle slider changes for min/max
    const handleSliderChange = (e, isMin) => {
        const value = parseInt(e.target.value);
        if (isMin) {
            handleFilterChange('priceMin', '$' + value.toLocaleString());
        } else {
            handleFilterChange('priceMax', '$' + value.toLocaleString());
        }
    };

    const getNumericValue = (priceString) => {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
    };

    const minValue = getNumericValue(filters.priceMin);
    const maxValue = getNumericValue(filters.priceMax) || 20000000;

    // Toggle bed/bath selection for ranges
    const toggleSelection = (key, value) => {
        const current = filters[key];
        if (Array.isArray(current)) {
            if (current.includes(value)) {
                const newSelection = current.filter(v => v !== value);
                handleFilterChange(key, newSelection.length === 0 ? 'Any' : newSelection);
            } else {
                handleFilterChange(key, [...current, value]);
            }
        } else if (current === 'Any') {
            handleFilterChange(key, [value]);
        } else {
            handleFilterChange(key, [current, value]);
        }
    };

    const isSelected = (key, value) => {
        const current = filters[key];
        if (current === 'Any') return value === 'Any';
        if (Array.isArray(current)) return current.includes(value);
        return current === value;
    };

    return (
        <div className="filter-modal-overlay" onClick={onClose}>
            <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
                <div className="filter-modal-header">
                    <button
                        className="reset-btn"
                        onClick={() => onFiltersChange({
                            listingType: 'buy',
                            priceMin: '',
                            priceMax: '',
                            beds: 'Any',
                            baths: 'Any',
                            propertyTypes: []
                        })}
                    >
                        Reset
                    </button>
                    <h2>Filters</h2>
                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="filter-modal-body">
                    <div className="filter-tabs">
                        <button
                            className={`tab-btn ${filters.listingType === 'buy' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('listingType', 'buy')}
                        >
                            For sale
                        </button>
                        <button
                            className={`tab-btn ${filters.listingType === 'rent' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('listingType', 'rent')}
                        >
                            For rent
                        </button>
                    </div>

                    <div className="filter-search">
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for a filter..."
                        />
                    </div>

                    <div className="filter-section">
                        <div className="section-header">
                            <h3>Price</h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        <div className="price-inputs">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="No min"
                                    value={filters.priceMin}
                                    onChange={(e) => handlePriceChange('priceMin', e.target.value)}
                                />
                            </div>
                            <span className="separator">to</span>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="No max"
                                    value={filters.priceMax}
                                    onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="price-slider-container">
                            <div className="dual-slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="20000000"
                                    step="100000"
                                    value={minValue}
                                    onChange={(e) => handleSliderChange(e, true)}
                                    className="price-slider slider-min"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="20000000"
                                    step="100000"
                                    value={maxValue}
                                    onChange={(e) => handleSliderChange(e, false)}
                                    className="price-slider slider-max"
                                />
                                <div className="slider-track">
                                    <div
                                        className="slider-range"
                                        style={{
                                            left: `${(minValue / 20000000) * 100}%`,
                                            right: `${100 - (maxValue / 20000000) * 100}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="slider-labels">
                                <span>$0</span>
                                <span>$20M</span>
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="section-header">
                            <h3>Bedrooms</h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        <div className="pills-scroll">
                            {['Any', 'Studio', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    className={`pill-btn ${isSelected('beds', opt) ? 'active' : ''}`}
                                    onClick={() => opt === 'Any' ? handleFilterChange('beds', 'Any') : toggleSelection('beds', opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="section-header">
                            <h3>Bathrooms</h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        <div className="pills-scroll">
                            {['Any', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    className={`pill-btn ${isSelected('baths', opt) ? 'active' : ''}`}
                                    onClick={() => opt === 'Any' ? handleFilterChange('baths', 'Any') : toggleSelection('baths', opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="section-header">
                            <h3>Property types</h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        <div className="property-types-grid">
                            <button className="type-card">
                                <svg className="type-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                <span>Residential</span>
                            </button>
                            <button className="type-card">
                                <svg className="type-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="4" y="2" width="16" height="20" rx="2" />
                                    <path d="M9 22v-4h6v4M9 6h.01M9 10h.01M9 14h.01M15 6h.01M15 10h.01M15 14h.01" />
                                </svg>
                                <span>Townhomes</span>
                            </button>
                            <button className="type-card">
                                <svg className="type-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 21h18M3 7v14M21 7v14M7 7h10M7 11h10M7 15h10" />
                                    <path d="M12 3l9 4v0M12 3L3 7" />
                                </svg>
                                <span>Condos</span>
                            </button>
                            <button className="type-card">
                                <svg className="type-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="2" y="7" width="20" height="14" rx="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                <span>Multi-family</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="filter-modal-footer">
                    <button className="save-search-btn-secondary">Save search</button>
                    <button className="see-results-btn" onClick={onClose}>
                        See properties
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
