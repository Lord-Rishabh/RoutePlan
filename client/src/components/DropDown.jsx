import React, { useState } from 'react';

function CoordinateForm({setStartLatitude, setStartLongitude, setEndLatitude, setEndLongitude}) {
  var startLatitude, startLongitude, endLatitude, endLongitude;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, such as updating state or making an API call
    setStartLatitude(startLatitude);
    setEndLatitude(endLatitude);
    setStartLongitude(startLongitude);
    setEndLongitude(endLongitude);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Coordinate Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startLatitude" className="block text-sm font-medium text-gray-700">Start Latitude</label>
          <input

            id="startLatitude"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={startLatitude}
            onChange={(e) => setStartLatitude(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startLongitude" className="block text-sm font-medium text-gray-700">Start Longitude</label>
          <input

            id="startLongitude"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={startLongitude}
            onChange={(e) => setStartLongitude(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endLatitude" className="block text-sm font-medium text-gray-700">End Latitude</label>
          <input

            id="endLatitude"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={endLatitude}
            onChange={(e) => setEndLatitude(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endLongitude" className="block text-sm font-medium text-gray-700">End Longitude</label>
          <input

            id="endLongitude"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            value={endLongitude}
            onChange={(e) => setEndLongitude(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CoordinateForm;
