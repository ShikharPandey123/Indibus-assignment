import { useState } from "react";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import WidgetSelector from "../components/WidgetSelector";

export default function Home() {
    const [selectedWidgets, setSelectedWidgets] = useState({ weather: true, news: true });
    const [selectedCity, setSelectedCity] = useState("New York"); // Default city

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">🌞 Custom Dashboard</h1>
                    
                    {/* City Selector */}
                    <div className="flex justify-center items-center mb-4">
                        <label className="mr-2 text-lg">Select City:</label>
                        <select 
                            value={selectedCity} 
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="p-2 bg-gray-700 text-white rounded-lg"
                        >
                            <option value="New York">New York</option>
                            <option value="London">London</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Paris">Paris</option>
                            <option value="Sydney">Sydney</option>
                        </select>
                    </div>

                    {/* Widget Selector */}
                    <WidgetSelector selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />
                    
                    {/* Widgets Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {selectedWidgets.weather && (
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                                <WeatherWidget city={selectedCity} />
                            </div>
                        )}
                        {selectedWidgets.news && (
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                                <NewsWidget query="technology" />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
} 