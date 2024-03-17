import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StopForm({ setStartLatitude, setStartLongitude, setEndLatitude, setEndLongitude, setcStops }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startLatitude: '',
    startLongitude: '',
    endLatitude: '',
    endLongitude: ''
  });
  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    setStops([...stops, [0, 0]]);
  };

  const handleStopLatitudeChange = (index, value) => {
    const updatedStops = [...stops];
    updatedStops[index][0] = parseFloat(value);
    setStops(updatedStops);
  };

  const handleStopLongitudeChange = (index, value) => {
    const updatedStops = [...stops];
    updatedStops[index][1] = parseFloat(value);
    setStops(updatedStops);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartLatitude(formData.startLatitude);
    setStartLongitude(formData.startLongitude);
    setEndLatitude(formData.endLatitude);
    setEndLongitude(formData.endLongitude);
    setcStops(stops);
    console.log("!@" + formData.startLongitude);
    navigate("/map");
  };

  return (<>
    <div className="">
      <div
        className="w-full h-[100vh] px-9 gap-8 justify-between items-center fixed"
        style={{
          backgroundImage:
            'url("https://static.vecteezy.com/system/resources/previews/000/271/674/original/vector-polygonal-world-map.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center  mt-40 space-x-12">
          <div className="w-[40vw] bg-opacity-40 bg-white p-8 rounded-lg mr-12 ">
            <h1 className="text-3xl">Navigate. Optimize. Deliver</h1>
            <p className="my-8">
              Welcome to Volvo-Eicher's Route Planner App, your trusted companion for efficient and seamless navigation. Whether you're a seasoned driver or a logistics professional, our user-friendly platform empowers you to plan and optimize your routes with ease. Say goodbye to wasted time and fuel with our advanced route optimization algorithms tailored to your specific needs. Navigate through complex road networks effortlessly, ensuring timely deliveries and cost-effective operations. Join us on the journey towards smarter logistics solutions with Volvo-Eicher's Route Planner App.
            </p>
          </div>

          <div className='pl-12 '>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto 	bg-opacity-30 bg-white p-4 rounded-lg">
              <div className="mb-4 ">
                <label className="block  text-sm font-bold mb-2">Start Latitude:</label>
                <input
                  type="number"
                  value={formData.startLatitude}
                  onChange={handleChange}
                  id="startLatitude"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Start Longitude:</label>
                <input
                  type="text"
                  value={formData.startLongitude}
                  onChange={handleChange}
                  id="startLongitude"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">End Latitude:</label>
                <input
                  type="text"
                  value={formData.endLatitude}
                  onChange={handleChange}
                  id="endLatitude"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">End Longitude:</label>
                <input
                  type="text"
                  value={formData.endLongitude}
                  onChange={handleChange}
                  id="endLongitude"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center items-center">

              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                Submit
              </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </>

  );
}

export default StopForm;
