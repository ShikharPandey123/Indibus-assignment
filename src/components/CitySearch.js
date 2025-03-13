import { useState } from "react";

export default function CitySearch({ setSelectedCity }) {
    const [city, setCity] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim() === "") return; // Prevent empty search
        setSelectedCity(city);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-3 w-full max-w-lg mx-auto">
            {/* Search Input */}
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="🌍 Enter a city..."
                className="flex-1 p-3 text-lg bg-gray-900/60 backdrop-blur-lg text-white rounded-lg shadow-lg border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />

            {/* Search Button */}
            <button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
                🔍 Search
            </button>
        </form>
    );
}
