import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ForecastChart({ city }) {
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchForecast() {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
                );
                setForecastData(response.data);
            } catch (error) {
                console.error("Error fetching forecast:", error);
                setForecastData(null);
                setError(true);
            }
            setLoading(false);
        }

        fetchForecast();
    }, [city]);

    if (loading) {
        return <p className="text-center text-gray-400 animate-pulse">Loading forecast...</p>;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold">⚠️ City Not Found</h2>
                <p>Weather forecast is not available for "{city}".</p>
            </div>
        );
    }

    if (!forecastData) return null;

    // Extract and group data for every 3 hours (to reduce clutter)
    const filteredData = forecastData.list.filter((_, index) => index % 2 === 0);
    const labels = filteredData.map((entry) =>
        new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    const temperatures = filteredData.map((entry) => entry.main.temp);

    const data = {
        labels,
        datasets: [
            {
                label: `🌡️ Temperature in ${city} (°C)`,
                data: temperatures,
                borderColor: "rgba(255, 99, 132, 1)", // Soft red
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Smooth curved lines
                pointRadius: 4,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointBorderColor: "#fff",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#fff", // White legend text
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#ddd" },
                title: {
                    display: true,
                    text: "Time",
                    color: "#ddd",
                },
            },
            y: {
                ticks: { color: "#ddd" },
                title: {
                    display: true,
                    text: "Temperature (°C)",
                    color: "#ddd",
                },
            },
        },
    };

    return (
        <div className="p-6 bg-gray-900/50 backdrop-blur-lg text-white rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-4">📊 Weather Forecast</h2>
            <div className="relative h-72">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
