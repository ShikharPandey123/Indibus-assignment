import { useState, useEffect } from "react";
import axios from "axios";

export default function AirQualityWidget({ city }) {
    const [aqi, setAqi] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch AQI Data
    useEffect(() => {
        async function fetchAirQuality() {
            try {
                setLoading(true);
                setError(null);

                // Convert city name to lat/lon
                const geoResponse = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
                );

                if (geoResponse.data.length === 0) {
                    throw new Error("City not found");
                }

                const { lat, lon } = geoResponse.data[0];

                // Fetch AQI using coordinates
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
                );

                setAqi(response.data.list[0]);
            } catch (error) {
                console.error("Error fetching AQI:", error);
                setError("Failed to load air quality data.");
            }
            setLoading(false);
        }

        fetchAirQuality();
    }, [city]);

    // AQI Descriptions & Colors
    const getAQIStatus = (aqiValue) => {
        const aqiLevels = {
            1: { label: "Good", color: "bg-green-500" },
            2: { label: "Fair", color: "bg-yellow-500" },
            3: { label: "Moderate", color: "bg-orange-500" },
            4: { label: "Poor", color: "bg-red-500" },
            5: { label: "Hazardous", color: "bg-purple-700" },
        };
        return aqiLevels[aqiValue] || { label: "Unknown", color: "bg-gray-500" };
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-lg shadow-lg text-white border border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-4">🌫️ Air Quality Index</h2>

            {loading ? (
                <p className="text-center text-gray-400 animate-pulse">Loading air quality data...</p>
            ) : error ? (
                <p className="text-center text-red-400">{error}</p>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Location: {city}</p>

                    {/* AQI Level Display */}
                    <div className={`mt-4 px-6 py-3 text-lg font-bold rounded-lg ${getAQIStatus(aqi.main.aqi).color}`}>
                        AQI Level: {aqi.main.aqi} ({getAQIStatus(aqi.main.aqi).label})
                    </div>

                    {/* Pollutant Details */}
                    <div className="mt-4 space-y-2 text-gray-300">
                        <p>🌬️ CO: {aqi.components.co} µg/m³</p>
                        <p>💨 NO2: {aqi.components.no2} µg/m³</p>
                        <p>🌪️ O3: {aqi.components.o3} µg/m³</p>
                        <p>🔥 PM2.5: {aqi.components.pm2_5} µg/m³</p>
                        <p>☁️ PM10: {aqi.components.pm10} µg/m³</p>
                    </div>
                </div>
            )}
        </div>
    );
}
