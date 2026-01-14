import { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { SITE_CONFIG } from '../../../config';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const PropertyMapGoogle = ({ listings, onMapMove, onMarkerClick, selectedListing }) => {
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    console.log('Google Maps API Key:', SITE_CONFIG.googleMaps.apiKey ? 'Loaded' : 'Missing');
    console.log('API Key value:', SITE_CONFIG.googleMaps.apiKey);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: SITE_CONFIG.googleMaps.apiKey
    });

    const onLoad = useCallback((map) => {
        console.log('Google Map loaded successfully!');
        setMap(map);
        setMapLoaded(true);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Handle map bounds change
    const handleBoundsChanged = useCallback(() => {
        if (map && onMapMove) {
            const bounds = map.getBounds();
            if (bounds) {
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                onMapMove({
                    north: ne.lat(),
                    south: sw.lat(),
                    east: ne.lng(),
                    west: sw.lng()
                });
            }
        }
    }, [map, onMapMove]);

    // Fly to selected listing
    useEffect(() => {
        if (map && selectedListing) {
            map.panTo({
                lat: selectedListing.coordinates.lat,
                lng: selectedListing.coordinates.lng
            });
            map.setZoom(15);
            setActiveMarker(selectedListing.id);
        }
    }, [map, selectedListing]);

    if (!isLoaded) {
        return <div className="map-loading">Loading map...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={SITE_CONFIG.googleMaps.defaultCenter}
            zoom={SITE_CONFIG.googleMaps.defaultZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onBoundsChanged={handleBoundsChanged}
            options={{
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ],
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true
            }}
        >
            {listings.map((listing) => (
                <Marker
                    key={listing.id}
                    position={{
                        lat: listing.coordinates.lat,
                        lng: listing.coordinates.lng
                    }}
                    onClick={() => {
                        setActiveMarker(listing.id);
                        if (onMarkerClick) {
                            onMarkerClick(listing);
                        }
                    }}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: selectedListing?.id === listing.id ? 12 : 10,
                        fillColor: selectedListing?.id === listing.id ? '#4A5D4F' : '#FFFFFF',
                        fillOpacity: 1,
                        strokeColor: '#4A5D4F',
                        strokeWeight: 2
                    }}
                    label={{
                        text: listing.priceFormatted,
                        color: selectedListing?.id === listing.id ? '#FFFFFF' : '#000000',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                />
            ))}

            {activeMarker && (
                <InfoWindow
                    position={{
                        lat: listings.find(l => l.id === activeMarker)?.coordinates.lat,
                        lng: listings.find(l => l.id === activeMarker)?.coordinates.lng
                    }}
                    onCloseClick={() => setActiveMarker(null)}
                >
                    <div className="marker-popup">
                        {(() => {
                            const listing = listings.find(l => l.id === activeMarker);
                            return listing ? (
                                <>
                                    <img src={listing.image} alt={listing.address} style={{ width: '250px', height: '150px', objectFit: 'cover' }} />
                                    <div className="popup-content">
                                        <h4>{listing.priceFormatted}</h4>
                                        <p>{listing.address}</p>
                                        <p>{listing.beds} BD | {listing.baths} BA | {listing.sqftFormatted} SQ.FT.</p>
                                    </div>
                                </>
                            ) : null;
                        })()}
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default PropertyMapGoogle;
