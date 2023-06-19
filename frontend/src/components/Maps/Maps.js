import React from 'react';
import { useState } from 'react';
import { GoogleMap,
        useJsApiLoader,
        Marker,
      } from '@react-google-maps/api';
import states from './states';
import { useMarker } from '../../context/MarkerCoords';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 38.9072,
  lng: 77.0369,
};


const Maps = ({ apiKey, eventLoc, editing}) => {
  const {lat, setLat, lng, setLng} = useMarker()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  function onMarkerDragEnd(e){
    setLat(e.latLng.lat())
    setLng(e.latLng.lng())
    
  }

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={eventLoc || center}
          zoom={11}
        >
          {eventLoc &&
          <Marker
            position={eventLoc}
            draggable={editing}
            onDragEnd={(e) => onMarkerDragEnd(e)}
          />}
        </GoogleMap>


      )}
    </>
  );
};

export default React.memo(Maps);
