import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherWidget({ city }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchWeather() {
            try {
                setError(false);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
                );
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather:", error);
                setWeather(null);
                setError(true);
            }
        }

        fetchWeather();
    }, [city]);

    if (error) {
        return (
            <div className="p-4 bg-red-100/30 backdrop-blur-md text-red-700 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">⚠️ City Not Found</h2>
                <p>We couldn't find weather data for "{city}". Try a different city.</p>
            </div>
        );
    }

    if (!weather) {
        return <p className="text-center text-gray-400">Loading weather...</p>;
    }

    return (
        <div className="p-6 bg-black/30 backdrop-blur-lg text-white rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg">{weather.weather[0].description}</p>
            <h1 className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</h1>
            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    );
}
