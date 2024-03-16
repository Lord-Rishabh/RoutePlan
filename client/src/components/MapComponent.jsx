import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXRoYXJ2am9zaGkiLCJhIjoiY2x0dHQ3M2lxMTBobjJqcDd5cHRkNjZsZyJ9.o3cmAVRVx5VRlkFbmWb3zQ';

function MapComponent() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [75.876359,22.68], // Set initial center to (0, 0)
      zoom: 16,
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl());

    // Fetch route data from Mapbox Directions API
    fetchRoute(map);

    // Clean up on unmount
    return () => map.remove();
  }, []);

  // Function to fetch and display route
  const fetchRoute = async (map) => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/75.833616,22.739099;75.876359,22.684189?geometries=geojson&access_token=${mapboxgl.accessToken}`);
    const data = await response.json();
    const route = data.routes[0].geometry;

    // Add route layer to map
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  };

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
  );
}

export default MapComponent;
