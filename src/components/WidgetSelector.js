import { FaCloudSun, FaNewspaper, FaChartLine, FaSmog } from "react-icons/fa";

export default function WidgetSelector({ selectedWidgets, setSelectedWidgets }) {
    const widgetIcons = {
        weather: <FaCloudSun className="text-yellow-400 text-lg" />,
        news: <FaNewspaper className="text-blue-400 text-lg" />,
        forecast: <FaChartLine className="text-green-400 text-lg" />,
        airQuality: <FaSmog className="text-gray-400 text-lg" />,
    };

    const toggleWidget = (widget) => {
        setSelectedWidgets((prev) => ({ ...prev, [widget]: !prev[widget] }));
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
            {Object.keys(selectedWidgets).map((widget) => (
                <button
                    key={widget}
                    onClick={() => toggleWidget(widget)}
                    className={`flex items-center space-x-2 p-3 rounded-lg shadow-lg transition-all duration-300
                        ${selectedWidgets[widget] ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}
                        focus:outline-none`}
                >
                    {widgetIcons[widget]}
                    <span className="text-white font-semibold capitalize">{widget}</span>
                </button>
            ))}
        </div>
    );
}
