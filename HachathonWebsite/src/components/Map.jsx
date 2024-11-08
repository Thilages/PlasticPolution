import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import 'leaflet.heat'; // Import heatmap plugin
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Map() {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // State to hold user's location
  const navigate = useNavigate();

  useEffect(() => {
    // Get user's current location
    setUserLocation([11.3579279, 77.8297595 ]);
    // Uncomment this for real geolocation
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setUserLocation([position.coords.latitude, position.coords.longitude]);
    //   },
    //   (error) => {
    //     console.error("Error getting user location:", error);
    //   }
    // );
  }, []);

  useEffect(() => {
    // Fetch locations from the Flask endpoint
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_locations');
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations(); // Call the function to fetch locations
  }, []);

  useEffect(() => {
    // Initialize map only when the user's location is available
    if (userLocation) {
      const map = L.map('map').setView(userLocation, 12); // Set initial view to user's location

      // Add dark tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,

      }).addTo(map);

      // Prepare data for the heatmap
      const heatmapData = locations.map(loc => [loc.latitude, loc.longitude, 1]);

      // Create heatmap layer if there are locations
      if (heatmapData.length > 0) {
        L.heatLayer(heatmapData, {
          radius: 20,
          blur: 15,
          maxZoom: 17
        }).addTo(map);
      }

      // Cleanup function
      return () => {
        map.remove();
      };
    }
  }, [userLocation, locations]); // Run this effect when userLocation or locations change

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => navigate("/map")}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hidden"
      >
        Go to Map
      </button>
      <div id='map' className='h-[500px] mt-32 border-8 border-[#630018] rounded-3xl mx-auto w-[50%]'></div>
    </div>
  );
}

export default Map;
