import { useEffect, useState } from "react";
import axios from "axios";
import { FaWind, FaTint, FaTemperatureLow } from "react-icons/fa"; // Weather Icons

export default function WeatherWidget({ city }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
                );
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather:", error);
                setWeather(null);
                setError(true);
            }
            setLoading(false);
        }

        fetchWeather();
    }, [city]);

    // Determine background gradient based on temperature
    const getBackgroundGradient = (temp) => {
        if (temp <= 0) return "bg-gradient-to-r from-blue-600 to-gray-700";
        if (temp > 0 && temp <= 15) return "bg-gradient-to-r from-blue-400 to-gray-500";
        if (temp > 15 && temp <= 30) return "bg-gradient-to-r from-yellow-400 to-orange-500";
        return "bg-gradient-to-r from-red-500 to-pink-600";
    };

    if (loading) return <p className="text-center text-gray-400 animate-pulse">Loading weather...</p>;

    if (error) {
        return (
            <div className="p-6 bg-red-600/30 text-white rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-bold">⚠️ City Not Found</h2>
                <p>Weather data for "{city}" is not available. Try another city.</p>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-lg shadow-lg text-white ${getBackgroundGradient(weather.main.temp)}`}>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
                <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt="Weather Icon" 
                    className="w-16 h-16"
                />
            </div>

            <p className="text-lg italic">{weather.weather[0].description}</p>
            <h1 className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</h1>
            <p className="text-gray-200">Feels like: {Math.round(weather.main.feels_like)}°C</p>

            {/* Weather Details */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                    <FaTint className="text-blue-300 text-2xl" />
                    <p className="text-lg">{weather.main.humidity}%</p>
                    <p className="text-sm text-gray-300">Humidity</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaWind className="text-gray-300 text-2xl" />
                    <p className="text-lg">{weather.wind.speed} m/s</p>
                    <p className="text-sm text-gray-300">Wind Speed</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaTemperatureLow className="text-orange-300 text-2xl" />
                    <p className="text-lg">{Math.round(weather.main.temp_min)}°C</p>
                    <p className="text-sm text-gray-300">Min Temp</p>
                </div>
            </div>
        </div>
    );
}
