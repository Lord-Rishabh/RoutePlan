import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXRoYXJ2am9zaGkiLCJhIjoiY2x0dHQ3M2lxMTBobjJqcDd5cHRkNjZsZyJ9.o3cmAVRVx5VRlkFbmWb3zQ";

function MapComponent({
  startLatitude,
  endLatitude,
  startLongitude,
  endLongitude,
  cStops,
}) {
  const mapContainerRef = useRef(null);
  const [stops, setStops] = useState([
  ]);

  const getStops = () => {
    const start = [
      [startLatitude, startLongitude],
    ];
    const end = [
      [endLatitude, endLongitude],
    ];
    const updatedStops = [...start, ...cStops, ...end];
    setStops(updatedStops);
  }

  // useEffect(() => {

  // },[]);

  useEffect(() => {
    // getStops();

    let map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [startLatitude, startLongitude], // Set initial center to the provided coordinates
      zoom: 12,
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl());

    // Fetch route data from Mapbox Directions API whenever coordinates change
    const start = [
      [startLatitude, startLongitude],
    ];
    const end = [
      [endLatitude, endLongitude],
    ];
    const updatedStops = [...start, ...cStops, ...end];
    setStops(updatedStops);
    fetchRoute(map);

    // Clean up on unmount
    return () => map.remove();
  }, [startLatitude, startLongitude, endLatitude, endLongitude]);

  // Function to fetch and display route
  const fetchRoute = async (map) => {
    const start = [
      [startLatitude, startLongitude],
    ];
    const end = [
      [endLatitude, endLongitude],
    ];
    const updatedStops = [...start, ...cStops, ...end];
    setStops(updatedStops);
    // Constructing the coordinates string for the stops
    let coordinatesString = stops.map(stop => stop.join(',')).join(';');

    console.log("#$ " + coordinatesString);

    const response = await fetch(`
      https://api.mapbox.com/directions/v5/mapbox/driving/${startLatitude},${startLongitude};${endLatitude},${endLongitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    console.log(`
    https://api.mapbox.com/directions/v5/mapbox/driving/${startLatitude},${startLongitude};${endLatitude},${endLongitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`);

    const data = await response.json();
    const route = data.routes[0].geometry;

    // Remove previous route layer if exists
    map.getSource("route") && map.removeLayer("route");
    map.getSource("start") && map.removeLayer("start");
    map.getSource("end") && map.removeLayer("end");

    // Add route layer to map
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: route,
        },
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });

    // Add start marker
    map.addLayer({
      id: "start",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [ startLatitude, startLongitude],
          },
        },
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#98c36a",
      },
    });

    // Add end marker
    map.addLayer({
      id: "end",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [ endLatitude, endLongitude],
          },
        },
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#e05340",
      },
    });
  };

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
}

export default MapComponent;