import { useState, useEffect } from 'react';

/**
 * Custom hook for managing favorite properties
 * Stores favorites in localStorage for persistence
 */
const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('favoriteProperties');
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const toggleFavorite = (propertyId) => {
        setFavorites(prev => {
            if (prev.includes(propertyId)) {
                // Remove from favorites
                return prev.filter(id => id !== propertyId);
            } else {
                // Add to favorites
                return [...prev, propertyId];
            }
        });
    };

    const isFavorite = (propertyId) => {
        return favorites.includes(propertyId);
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length
    };
};

export default useFavorites;
