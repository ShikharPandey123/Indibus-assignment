import { useState } from "react";
import WeatherWidget from "../components/WeatherWidget";
import ForecastChart from "../components/ForecastChart";
import AirQualityWidget from "../components/AirQualityWidget";
import NewsWidget from "../components/NewsWidget";
import CityAutocomplete from "../components/CityAutocomplete";
import WidgetSelector from "../components/WidgetSelector";
import SunriseSunset from "../components/SunriseSunset";

export default function Home() {
    const [selectedCity, setSelectedCity] = useState("New York");
    const [selectedWidgets, setSelectedWidgets] = useState({
        weather: true,
        forecast: true,
        airQuality: true,
        news: true,
        sunriseSunset: true,
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-black/30 backdrop-blur-lg p-8 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-4">🌍 Weather & News Dashboard</h1>
                <CityAutocomplete setSelectedCity={setSelectedCity} />

                <WidgetSelector selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {selectedWidgets.weather && <WeatherWidget city={selectedCity} />}
                    {selectedWidgets.forecast && <ForecastChart city={selectedCity} />}
                    {selectedWidgets.airQuality && <AirQualityWidget city={selectedCity} />}
                    {selectedWidgets.news && <NewsWidget query={selectedCity} />}
                    {selectedWidgets.sunriseSunset && <SunriseSunset city={selectedCity} />}
                </div>
            </div>
        </div>
    );
}
