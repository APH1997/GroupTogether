import React from 'react';
import { GoogleMap,
        useJsApiLoader,
        Marker,
      } from '@react-google-maps/api';


const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 38.9072,
  lng: 77.0369,
};


const Maps = ({ apiKey, eventLoc}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });


  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={eventLoc || center}
          zoom={11}
        >
          {eventLoc &&
          <Marker position ={eventLoc}/>}
        </GoogleMap>


      )}
    </>
  );
};

export default React.memo(Maps);
