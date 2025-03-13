import { useState } from "react";
import WeatherWidget from "../components/WeatherWidget";
import ForecastChart from "../components/ForecastChart";
import AirQualityWidget from "../components/AirQualityWidget";
import NewsWidget from "../components/NewsWidget";
import CityAutocomplete from "../components/CityAutocomplete";
import WidgetSelector from "../components/WidgetSelector";
import SunriseSunset from "../components/SunriseSunset";
import { motion, AnimatePresence } from "framer-motion";

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
            <div className="max-w-5xl w-full bg-gray-800/60 backdrop-blur-lg p-8 rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold text-center mb-6 tracking-wide text-white">
                    🌍 Weather & News Dashboard
                </h1>
                {/* City Autocomplete Component */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CityAutocomplete setSelectedCity={setSelectedCity} />
                </motion.div>

                {/* Widget Selector */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <WidgetSelector selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />
                </motion.div>

                {/* Widget Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <AnimatePresence>
                        {selectedWidgets.weather && (
                            <motion.div
                                key="weather"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <WeatherWidget city={selectedCity} />
                            </motion.div>
                        )}

                        {selectedWidgets.forecast && (
                            <motion.div
                                key="forecast"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <ForecastChart city={selectedCity} />
                            </motion.div>
                        )}

                        {selectedWidgets.airQuality && (
                            <motion.div
                                key="airQuality"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <AirQualityWidget city={selectedCity} />
                            </motion.div>
                        )}

                        {selectedWidgets.news && (
                            <motion.div
                                key="news"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <NewsWidget query={selectedCity} />
                            </motion.div>
                        )}

                        {selectedWidgets.sunriseSunset && (
                            <motion.div
                                key="sunriseSunset"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <SunriseSunset city={selectedCity} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
