import { useEffect, useState } from "react";
import axios from "axios";
import { FaSun, FaMoon } from "react-icons/fa"; // Sun & Moon Icons

export default function SunriseSunset({ city }) {
    const [sunData, setSunData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSunData() {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
                );
                setSunData(response.data.sys);
            } catch (error) {
                console.error("Error fetching sunrise/sunset data:", error);
                setSunData(null);
            }
            setLoading(false);
        }

        fetchSunData();
    }, [city]);

    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

    if (loading) return <p className="text-center text-gray-400 animate-pulse">Loading sunrise/sunset data...</p>;

    if (!sunData) {
        return (
            <div className="p-6 bg-red-600/30 text-white rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-bold">⚠️ Data Not Available</h2>
                <p>Couldn't fetch sunrise/sunset times for "{city}".</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-900/50 backdrop-blur-lg text-white rounded-lg shadow-lg border border-gray-700 text-center">
            <h2 className="text-2xl font-bold mb-4">🌅 Sunrise & Sunset</h2>

            {/* Sunrise */}
            <div className="flex items-center justify-center space-x-3 bg-gray-800 p-3 rounded-lg shadow-md">
                <FaSun className="text-yellow-400 text-3xl animate-pulse" />
                <p className="text-lg">Sunrise: <strong>{formatTime(sunData.sunrise)}</strong></p>
            </div>

            {/* Sunset */}
            <div className="flex items-center justify-center space-x-3 bg-gray-800 p-3 rounded-lg shadow-md mt-3">
                <FaMoon className="text-blue-400 text-3xl animate-pulse" />
                <p className="text-lg">Sunset: <strong>{formatTime(sunData.sunset)}</strong></p>
            </div>
        </div>
    );
}
