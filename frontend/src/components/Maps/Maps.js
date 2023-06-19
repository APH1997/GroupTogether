import React from 'react';
import { useState } from 'react';
import { GoogleMap,
        useJsApiLoader,
        Marker,
      } from '@react-google-maps/api';
import states from './states';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 38.9072,
  lng: 77.0369,
};


const Maps = ({ apiKey, eventLoc, editing}) => {

  const [lat, setLat] = useState(states[eventLoc.lat])
  const [lng, setLng] = useState(states[eventLoc.lng])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  function onMarkerDragEnd(e){
    setLat(e.latLng.lat())
    setLng(e.latLng.lng())
    console.log(lat,lng)
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
