import { useState } from "react";

export default function CitySearch({ setSelectedCity }) {
    const [city, setCity] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim() === "") return; // Prevent empty search
        setSelectedCity(city);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city..."
                className="p-2 border rounded-lg bg-gray-800 text-white focus:outline-none"
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                🔍 Search
            </button>
        </form>
    );
}
