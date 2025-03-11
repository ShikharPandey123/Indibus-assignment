// src/components/WeatherWidget.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherWidget({ city }) {
    const [weather, setWeather] = useState(null);
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        }
        fetchWeather();
    }, [city]);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            {weather ? (
                <>
                    <h2 className="text-2xl font-bold flex items-center space-x-2">
                        <span>{weather.name}, {weather.sys.country}</span>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" className="w-10 h-10" />
                    </h2>
                    <p className="text-lg">{weather.weather[0].description}</p>
                    <div className="flex justify-between mt-4">
                        <div className="text-5xl font-bold">{weather.main.temp}°C</div>
                        <div className="text-sm space-y-1">
                            <p>💧 Humidity: {weather.main.humidity}%</p>
                            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
}
