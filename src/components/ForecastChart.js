import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ForecastChart({ city }) {
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchForecast() {
            try {
                setError(false);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
                );
                setForecastData(response.data);
            } catch (error) {
                console.error("Error fetching forecast:", error);
                setForecastData(null);
                setError(true);
            }
        }

        fetchForecast();
    }, [city]);

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                <h2 className="text-lg font-bold">⚠️ City Not Found</h2>
                <p>Weather forecast is not available for "{city}".</p>
            </div>
        );
    }

    if (!forecastData) {
        return <p className="text-center text-gray-400">Loading forecast...</p>;
    }

    const labels = forecastData.list.map((entry) => new Date(entry.dt * 1000).toLocaleTimeString());
    const temperatures = forecastData.list.map((entry) => entry.main.temp);

    const data = {
        labels,
        datasets: [
            {
                label: `Temperature in ${city} (°C)`,
                data: temperatures,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                type: "category", // ✅ Explicitly specify the scale type
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Temperature (°C)",
                },
            },
        },
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg">
            <h2 className="text-lg font-bold">📊 Weather Forecast</h2>
            <div className="relative" style={{ height: "300px" }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
