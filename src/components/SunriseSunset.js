import { useEffect, useState } from "react";
import axios from "axios";

export default function SunriseSunset({ city }) {
    const [sunData, setSunData] = useState(null);

    useEffect(() => {
        async function fetchSunData() {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
            );
            setSunData(response.data.sys);
        }

        fetchSunData();
    }, [city]);

    if (!sunData) return <p>Loading sunrise/sunset...</p>;

    const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString();

    return (
        <div className="p-6 bg-black/30 backdrop-blur-lg text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">🌅 Sunrise & Sunset</h2>
            <p>Sunrise: {formatTime(sunData.sunrise)}</p>
            <p>Sunset: {formatTime(sunData.sunset)}</p>
        </div>
    );
}
