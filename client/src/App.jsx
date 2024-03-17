import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DropdownMenu from "./components/DropDown";
import MapComponent from "./components/MapComponent";
import Navbar from "./pages/Navbar";

function App() {
  const [startLatitude, setStartLatitude] = useState(22.684189);
  const [startLongitude, setStartLongitude] = useState(75.876359);
  const [endLatitude, setEndLatitude] = useState(22.684189);
  const [endLongitude, setEndLongitude] = useState(75.876359);
  const [cStops, setcStops] = useState([]);

  useEffect(() => {
    return () => {
      console.log(startLatitude);
    };
  }, []);

  return (
    <BrowserRouter>  {/* Wrap your application with BrowserRouter */}
      <div>
        <Navbar />
        {/* <LandingPage/> */}

        <Routes>
          <Route
            path="/"
            element={
              <DropdownMenu
                setStartLatitude={setStartLatitude}
                setStartLongitude={setStartLongitude}
                setEndLatitude={setEndLatitude}
                setEndLongitude={setEndLongitude}
                setcStops={setcStops}
              />
            }
          />

          <Route
            path="/map"
            element={
              <MapComponent
                startLatitude={startLatitude}
                endLatitude={endLatitude}
                startLongitude={startLongitude}
                endLongitude={endLongitude}
                cStops={cStops}
              />
            }
          />

          {/* Assuming you want this route to match any unmatched paths */}
          <Route
            path="*"
            element={
              <DropdownMenu
                setStartLatitude={setStartLatitude}
                setStartLongitude={setStartLongitude}
                setEndLatitude={setEndLatitude}
                setEndLongitude={setEndLongitude}
                setcStops={setcStops}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
