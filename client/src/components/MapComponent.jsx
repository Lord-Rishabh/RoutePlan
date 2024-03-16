import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXRoYXJ2am9zaGkiLCJhIjoiY2x0dHQ3M2lxMTBobjJqcDd5cHRkNjZsZyJ9.o3cmAVRVx5VRlkFbmWb3zQ';

function MapComponent() {
  const mapContainerRef = useRef(null);
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    });

    function setupMap(center) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 16,
      });

      // Clean up on unmount
      return () => map.remove();
    }

    function successLocation(position) {
      console.log(position);
      setCount(count+1);
      console.log(count);
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation(error) {
      console.error("ERROR_LOCATION_CALLED");
      setupMap([75.876359, 22.684189]);
    }

  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}></div>
  );
}

export default MapComponent;
