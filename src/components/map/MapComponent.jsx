import React, {
     useMemo, useCallback, useRef, useState, useEffect 
    } from 'react';
import {
    GoogleMap, MarkerF, DirectionsRenderer
} from "@react-google-maps/api";

import './style.scss';
import { car } from './map.image';

function MapComponent() {
    
    const markerOption = {
        path: car,
        scale: .7,
        strokeColor: 'white',
        strokeWeight: .10,
        fillOpacity: 1,
        fillColor: '#404040',
        rotation: undefined,
    }
    const mapRef = useRef()
    const centerLatLng = useMemo(() => ({ lat: 13.716126168149346, lng: 100.58480081600467 }), []);
    const carMarker = useMemo(() => ({ lat: 15.716126168149346, lng: 102.58480081600467 }), []) 
    const options = useMemo(() => {
        return {
            mapId: '4641550cf13bc112',
            disableDefaultUI: true,
            clickableIcons: false
        }
    }, []);
    const onLoad = useCallback((map) => (mapRef.current = map), [])

    // Direction Logic
    const [directions, setDirections] = useState();
    const fetchDirections = (position) => {
        if (!position) return;
    
        const service = new window.google.maps.DirectionsService();
        service.route(
          {
            origin: position,
            destination: centerLatLng,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK" && result) {
                console.log("this is direction", result);
              setDirections(result);
            }
          }
        );
    };
    useEffect(() => {
        const interval = setInterval(() => {
           if (carMarker) {
            fetchDirections(carMarker)
           } 
        }, 2000);
      
        return () => clearInterval(interval);
      }, [carMarker]);

    return (
        <GoogleMap
            zoom={15}
            center={centerLatLng}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
        >
            {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
           <MarkerF
                icon={markerOption}
                position={carMarker}
            ></MarkerF>
            <MarkerF
                position={centerLatLng}
            ></MarkerF>
        </GoogleMap>
    )
}

export default MapComponent;