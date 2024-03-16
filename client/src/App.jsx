import { useEffect, useState } from "react";
import "./App.css";
import DropdownMenu from "./components/DropDown";
import MapComponent from "./components/MapComponent";


function App() {
  const [startLatitude, setStartLatitude] = useState(75.876359);
  const [startLongitude, setStartLongitude] = useState(22.684189);
  const [endLatitude, setEndLatitude] = useState(75.876359);
  const [endLongitude, setEndLongitude] = useState(22.684189);
  
  useEffect(() => {
    return () => {
      console.log(startLatitude);
    }
  }, [])
  
  return (
    <>
      <DropdownMenu setStartLatitude={setStartLatitude} setStartLongitude={setStartLongitude} setEndLatitude={setEndLatitude} setEndLongitude={setEndLongitude} />


      <MapComponent startLatitude={startLatitude} endLatitude={endLatitude} startLongitude={startLongitude} endLongitude={endLongitude}/>
    </>
  );
}

export default App;
