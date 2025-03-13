import { useState } from "react";
import axios from "axios";

export default function CityAutocomplete({ setSelectedCity }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchCitySuggestions = async (searchTerm) => {
        if (searchTerm.length < 3) return; // Avoid unnecessary API calls for short queries

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
            );
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching city suggestions:", error);
            setSuggestions([]);
        }
    };

    const handleSelectCity = (cityName) => {
        setSelectedCity(cityName);
        setQuery(cityName);
        setSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    fetchCitySuggestions(e.target.value);
                }}
                placeholder="Search for a city..."
                className="w-full p-3 text-lg bg-gray-800 text-white rounded-lg outline-none"
            />
            {suggestions.length > 0 && (
                <ul className="absolute left-0 w-full bg-gray-900 text-white rounded-lg mt-1">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-700"
                            onClick={() => handleSelectCity(city.name)}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
