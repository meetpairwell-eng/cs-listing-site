import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SITE_CONFIG } from '../../../config';

const PropertyMap = ({ listings, onMapMove, onMarkerClick, selectedListing }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Initialize map
    useEffect(() => {
        if (map.current) return; // Initialize map only once

        // Ensure container is mounted
        if (!mapContainer.current) {
            console.error('Map container ref is null!');
            return;
        }

        console.log('Initializing map with token:', SITE_CONFIG.mapbox.accessToken.substring(0, 20) + '...');
        console.log('Map container ref:', mapContainer.current);
        console.log('Container dimensions:', mapContainer.current.offsetWidth, 'x', mapContainer.current.offsetHeight);

        mapboxgl.accessToken = SITE_CONFIG.mapbox.accessToken;

        // Small delay to ensure DOM is ready
        setTimeout(() => {
            try {
                map.current = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: SITE_CONFIG.mapbox.defaultCenter,
                    zoom: SITE_CONFIG.mapbox.defaultZoom,
                    attributionControl: true
                });

                console.log('Map instance created:', map.current);

                map.current.on('load', () => {
                    console.log('Map loaded successfully!');
                    setMapLoaded(true);
                });

                map.current.on('error', (e) => {
                    console.error('Map error:', e);
                });

                // Update filtered listings when map moves
                map.current.on('moveend', () => {
                    if (onMapMove) {
                        const bounds = map.current.getBounds();
                        onMapMove({
                            north: bounds.getNorth(),
                            south: bounds.getSouth(),
                            east: bounds.getEast(),
                            west: bounds.getWest()
                        });
                    }
                });
            } catch (error) {
                console.error('Error creating map:', error);
            }
        }, 100);

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [onMapMove]);

    // Update markers when listings change
    useEffect(() => {
        if (!mapLoaded || !map.current) return;

        // Remove existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Add new markers
        listings.forEach(listing => {
            // Create custom marker element
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.innerHTML = `
                <div class="marker-pin ${listing.id === selectedListing?.id ? 'selected' : ''}">
                    <span class="marker-price">${listing.priceFormatted}</span>
                </div>
            `;

            // Create marker
            const marker = new mapboxgl.Marker(el)
                .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
                .addTo(map.current);

            // Add click handler
            el.addEventListener('click', () => {
                if (onMarkerClick) {
                    onMarkerClick(listing);
                }
            });

            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="marker-popup">
                    <img src="${listing.image}" alt="${listing.address}" />
                    <div class="popup-content">
                        <h4>${listing.priceFormatted}</h4>
                        <p>${listing.address}</p>
                        <p>${listing.beds} BD | ${listing.baths} BA | ${listing.sqftFormatted} SQ.FT.</p>
                    </div>
                </div>
            `);

            marker.setPopup(popup);
            markers.current.push(marker);
        });
    }, [listings, mapLoaded, selectedListing, onMarkerClick]);

    // Fly to selected listing
    useEffect(() => {
        if (!map.current || !selectedListing) return;

        map.current.flyTo({
            center: [selectedListing.coordinates.lng, selectedListing.coordinates.lat],
            zoom: 15,
            duration: 1500,
            essential: true
        });
    }, [selectedListing]);

    return <div ref={mapContainer} className="map-container" />;
};

export default PropertyMap;
