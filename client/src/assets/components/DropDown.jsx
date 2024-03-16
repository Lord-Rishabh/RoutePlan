import React, { useState } from "react";
const DropdownMenu = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([{ id: 0, address: "" }]);

  const changeOrigin = (e) => setOrigin(e.target.value);
  const changeDestination = (e) => setDestination(e.target.value);
  const changeStop = (id) => (e) => {
    setStops(
      stops.map((stop) =>
        stop.id === id ? { id: id, address: e.target.value } : stop
      )
    );
  };

  const addStop = () => {
    setStops([...stops, { id: stops[stops.length - 1].id + 1, address: "" }]);
  };

  const removeStop = (id) => () => {
    setStops(stops.filter((stop) => stop.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-lg px-10 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-3xl font-bold text-primary">Route-Planner</h2>
            <h6 className="text-xl text-secondary">
              Mapped solution — no sweat
            </h6>
          </div>
          <form className="flex flex-col items-center space-y-4">
            <h6 className="text-xl font-semibold text-primary">
              Where do you plan to go?
            </h6>
            <input
              type="text"
              className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-primary"
              placeholder="From"
              value={origin}
              onChange={changeOrigin}
            />
            {stops.map((stop) => (
              <div key={stop.id} className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-primary"
                  placeholder="Stop"
                  value={stop.address}
                  onChange={changeStop(stop.id)}
                />
                <button
                  type="button"
                  className="absolute top-1/2 transform -translate-y-1/2 right-0"
                  onClick={removeStop(stop.id)}
                >
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-10 h-10 p-2 text-green-500 bg-green-100 rounded-full hover:bg-green-200"
              onClick={addStop}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <input
              type="text"
              className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-primary"
              placeholder="To"
              value={destination}
              onChange={changeDestination}
            />
            <hr className="w-full h-0.5 bg-gray-200" />
            <h6 className="text-xl font-semibold text-primary">Depart at?</h6>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 rounded border-gray-300 focus:outline-none focus:border-primary"
              //   defaultValue={moment().format().substring(0, 16)}
            />
            <button
              type="button"
              className="w-full px-3 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              // onClick={next({
              //   origin: origin,
              //   destination: destination,
              //   waypoints: stops.map((stop) => stop.address),
              // })}
            >
              Show my fastest route!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
