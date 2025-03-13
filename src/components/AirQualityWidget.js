import { useState, useEffect } from "react";
import axios from "axios";

export default function AirQualityWidget({ city }) {
    const [aqi, setAqi] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAirQuality() {
            try {
                // Step 1: Convert city to lat/lon using OpenWeatherMap Geocoding API
                const geoResponse = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
                );
                if (geoResponse.data.length === 0) {
                    throw new Error("City not found");
                }
                const { lat, lon } = geoResponse.data[0];

                // Step 2: Fetch Air Quality using lat/lon
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
                );
                setAqi(response.data.list[0]);
            } catch (error) {
                console.error("Error fetching AQI:", error);
                setError("Failed to load air quality data.");
            }
        }
        fetchAirQuality();
    }, [city]);

    return (
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">🌫️ Air Quality Index</h2>
            {error ? (
                <p className="text-red-400">{error}</p>
            ) : aqi ? (
                <p className="mt-2">AQI Level: <strong>{aqi.main.aqi}</strong> (Scale: 1-Good to 5-Hazardous)</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
