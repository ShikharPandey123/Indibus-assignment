// src/components/WidgetSelector.js
import { FaCloudSun, FaNewspaper } from "react-icons/fa"; // Import icons

export default function WidgetSelector({ selectedWidgets, setSelectedWidgets }) {
    return (
        <div className="flex space-x-4 p-4">
            <button
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-all`}
                onClick={() => setSelectedWidgets({ ...selectedWidgets, weather: !selectedWidgets.weather })}
            >
                <FaCloudSun 
                    className={`text-xl transition-all ${selectedWidgets.weather ? "text-yellow-800" : "text-gray-400"}`} 
                />
                <span>Weather</span>
            </button>
            <button
                className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-all`}
                onClick={() => setSelectedWidgets({ ...selectedWidgets, news: !selectedWidgets.news })}
            >
                <FaNewspaper 
                    className={`text-xl transition-all ${selectedWidgets.news ? "text-blue-500" : "text-gray-400"}`} 
                />
                <span>News</span>
            </button>
        </div>
    );
}
