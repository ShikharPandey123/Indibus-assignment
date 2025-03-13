import { useState, useEffect } from "react";
import axios from "axios";

export default function CityAutocomplete({ setSelectedCity }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.length >= 3) {
                fetchCitySuggestions(query);
            } else {
                setSuggestions([]);
            }
        }, 300); // Debounce API call (waits for user to stop typing)
        
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const fetchCitySuggestions = async (searchTerm) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
            );
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching city suggestions:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🌍 Search for a city..."
                className="w-full p-3 text-lg bg-gray-900/60 backdrop-blur-lg text-white rounded-lg shadow-lg outline-none border border-gray-700 focus:ring-2 focus:ring-blue-400 transition-all"
            />

            {/* Loading Spinner */}
            {loading && (
                <div className="absolute right-4 top-4 animate-spin text-gray-400">
                    ⏳
                </div>
            )}

            {suggestions.length > 0 && (
                <ul className="absolute left-0 w-full bg-gray-900/80 backdrop-blur-lg text-white rounded-lg mt-2 shadow-lg overflow-hidden">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
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
