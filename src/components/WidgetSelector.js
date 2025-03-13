export default function WidgetSelector({ selectedWidgets, setSelectedWidgets }) {
    const toggleWidget = (widget) => {
        setSelectedWidgets((prev) => ({ ...prev, [widget]: !prev[widget] }));
    };

    return (
        <div className="flex space-x-4 justify-center mt-4">
            {Object.keys(selectedWidgets).map((widget) => (
                <button
                    key={widget}
                    onClick={() => toggleWidget(widget)}
                    className={`p-2 rounded-lg ${selectedWidgets[widget] ? "bg-blue-500" : "bg-gray-600"}`}
                >
                    {widget.charAt(0).toUpperCase() + widget.slice(1)}
                </button>
            ))}
        </div>
    );
}
