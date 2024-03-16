import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1IjoiYXRoYXJ2am9zaGkiLCJhIjoiY2x0dHQ3M2lxMTBobjJqcDd5cHRkNjZsZyJ9.o3cmAVRVx5VRlkFbmWb3zQ";

function MapComponent({ startLatitude, endLatitude, startLongitude, endLongitude }) {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [startLatitude, startLongitude], // Set initial center to the provided coordinates
            zoom: 13,
        },
            console.log(startLongitude));

        console.log({ startLatitude, endLatitude, startLongitude, endLongitude })

        // Add navigation control
        map.addControl(new mapboxgl.NavigationControl());

        // Fetch route data from Mapbox Directions API whenever coordinates change
        fetchRoute(map);
        addMarkers(map, startLongitude, startLatitude, 'Starting');
        addMarkers(map, intermediateStop[0], intermediateStop[1], 'Intermediate');
        addMarkers(map, endLongitude, endLatitude, 'Ending');

        // Clean up on unmount
        return () => map.remove();
    }, [startLatitude, startLongitude, endLatitude, endLongitude]);

    const addMarkers = (map, lng, lat, label) => {
        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${label} Position</h3>`))
            .addTo(map);
    };
    const intermediateStop = [75.876359, 22.684189];
    // Function to fetch and display route
    const fetchRoute = async (map) => {
        const response = await fetch(
            "https://api.mapbox.com/directions/v5/mapbox/driving/75.876359,22.68;75.793203,23.175076;75.827500,22.722034;75.876359,22.684189?geometries=geojson&access_token=pk.eyJ1IjoiYXRoYXJ2am9zaGkiLCJhIjoiY2x0dHQ3M2lxMTBobjJqcDd5cHRkNjZsZyJ9.o3cmAVRVx5VRlkFbmWb3zQ"
        );
        console.log(`https://api.mapbox.com/directions/v5/mapbox/driving/${startLatitude},${startLongitude};${endLatitude},${endLongitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        const route = data.routes[0].geometry;

        // Remove previous route layer if exists
        // map.getSource("route") && map.removeLayer("route");
        // console.log(map.getSource("route"))

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
    };

    return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
}

export default MapComponent;
