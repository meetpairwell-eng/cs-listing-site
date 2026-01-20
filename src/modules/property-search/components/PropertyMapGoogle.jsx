import { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, OverlayView } from '@react-google-maps/api';
import { SITE_CONFIG } from '../../../config';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const PropertyMapGoogle = ({ listings, onMapMove, onMarkerClick, selectedListing }) => {
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

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
        // Allow bounds changes after a short delay to ensure initial center is set
        setTimeout(() => {
            setIsInitialLoad(false);
        }, 1000);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // Handle map bounds change - skip on initial load
    const handleBoundsChanged = useCallback(() => {
        if (map && onMapMove && !isInitialLoad) {
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
    }, [map, onMapMove, isInitialLoad]);

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
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#666666' }, { weight: 0.5 }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.stroke',
                        stylers: [{ visibility: 'off' }]
                    },
                    {
                        featureType: 'road.local',
                        elementType: 'labels.text',
                        stylers: [{ weight: 0.3 }]
                    }
                ],
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true
            }}
        >
            {listings.map((listing, index) => (
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
                        scale: selectedListing?.id === listing.id ? 12 : 8,
                        fillColor: selectedListing?.id === listing.id ? '#000000' : '#1A1A1A',
                        fillOpacity: 1,
                        strokeColor: '#FFFFFF',
                        strokeWeight: 2
                    }}
                    zIndex={100}
                />
            ))}

            {/* Price labels as overlays - every 4th marker */}
            {listings.map((listing, index) => {
                if (index % 4 !== 0) return null;

                const priceText = listing.price >= 1000000
                    ? `${(listing.price / 1000000).toFixed(1)}M`
                    : `${Math.round(listing.price / 1000)}K`;

                return (
                    <OverlayView
                        key={`label-${listing.id}`}
                        position={{
                            lat: listing.coordinates.lat,
                            lng: listing.coordinates.lng
                        }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div style={{
                            position: 'absolute',
                            transform: 'translate(-50%, -200%)',
                            background: 'white',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: '#1A1A1A',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            zIndex: 1000
                        }}>
                            {priceText}
                        </div>
                    </OverlayView>
                );
            })}

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
