import React, { useState } from "react";
import "./HealthCenters.css";
import img1 from "../../assets/img1.jpg";
import { BiSolidAmbulance } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_key } from "../../../utills/config";

// Haversine formula to calculate distance between two lat/lon points
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

function HealthCenters() {
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nearbyCenters, setNearbyCenters] = useState([]);


  // Function to fetch user location and nearby hospitals
  const fetchLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        try {
          // Fetch human-readable address using Nominatim API (can be replaced with Geoapify)
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          setAddress(response.data.display_name);

          // Fetch hospitals using Geoapify API
          const hospitalResponse = await axios.get(
            `https://api.geoapify.com/v2/places?categories=healthcare.hospital&lat=${latitude}&lon=${longitude}&apiKey=${api_key}`
          );

          // Filter hospitals that are within 10 km of the user's location
          const nearby = hospitalResponse.data.features.filter((hospital) => {
            const { lat, lon } = hospital.properties;
            const distance = haversineDistance(latitude, longitude, lat, lon);
            return distance <= 10; // Show hospitals within 10 km
          });

          // Format the nearby hospitals data to display
          const formattedHospitals = nearby.map((hospital) => ({
            title: hospital.properties.name,
            description: hospital.properties.address,
            latitude: hospital.properties.lat,
            longitude: hospital.properties.lon,
            img: img1, // You can add real images if available
          }));

          setNearbyCenters(formattedHospitals);
        } catch (error) {
          setError("Failed to get location details.");
        }
        setLoading(false);
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
      }
    );
  };

  return (
    <div className="health-center-section" id="home">
      <section className="health-center-section2">
        <div className="hospitalsNearMe">
          <button type="button" onClick={fetchLocation}>
            Hospitals Near Me!
          </button>
        </div>

        {loading && <p>Loading your location...</p>}

        {userLocation && (
          <div className="location-info">
            <h3>Your Location:</h3>
            <p>Latitude: {userLocation.latitude}</p>
            <p>Longitude: {userLocation.longitude}</p>
            {address && <p><strong>Address:</strong> {address}</p>}
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <div className="centers-container">
          {nearbyCenters.length > 0 ? (
            nearbyCenters.map((center, index) => (
              <div key={index} className="center-wrapper">
                <img src={center.img} alt="" />
                <p className="center-title">{center.title}</p>
                <p>{center.description}</p>
              </div>
            ))
          ) : (
            <p>No hospitals found nearby within 10 km.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default HealthCenters;
