import { useEffect, useState } from "react";
import axios from "axios";

// Define available categories
const categories = ["general", "technology", "sports", "business", "health", "science", "entertainment"];

export default function NewsWidget({ query }) {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [readLater, setReadLater] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const [category, setCategory] = useState("general");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch news articles
    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(
                    `https://gnews.io/api/v4/top-headlines?category=${category}&q=${query}&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}&lang=en&max=10`
                );
                setArticles(response.data.articles);
                setFilteredArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
                setError(true);
            }
            setLoading(false);
        }

        fetchNews();
    }, [query, category]);

    // Apply keyword filtering & sorting
    useEffect(() => {
        let filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.description.toLowerCase().includes(keyword.toLowerCase())
        );

        // Apply sorting
        filtered.sort((a, b) => {
            return sortOrder === "latest"
                ? new Date(b.publishedAt) - new Date(a.publishedAt)
                : new Date(a.publishedAt) - new Date(b.publishedAt);
        });

        setFilteredArticles(filtered);
    }, [keyword, sortOrder, articles]);

    // Save to "Read Later" list (with Local Storage)
    useEffect(() => {
        const savedArticles = JSON.parse(localStorage.getItem("readLater")) || [];
        setReadLater(savedArticles);
    }, []);

    const handleReadLater = (article) => {
        const updatedList = [...readLater, article];
        setReadLater(updatedList);
        localStorage.setItem("readLater", JSON.stringify(updatedList));
    };

    const handleRemoveReadLater = (url) => {
        const updatedList = readLater.filter((article) => article.url !== url);
        setReadLater(updatedList);
        localStorage.setItem("readLater", JSON.stringify(updatedList));
    };

    if (loading) return <p className="text-center text-gray-400 animate-pulse">Loading news...</p>;

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">⚠️ News Not Found</h2>
                <p>Oops! We couldn't fetch news for "{query}". Try again later.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-900/50 backdrop-blur-lg text-white rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-4">📰 Latest News about {query}</h2>

            {/* Search, Sorting & Category Selection */}
            <div className="mb-4 flex flex-col md:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Filter by keyword..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-3 text-black rounded-lg border border-gray-400 focus:outline-none"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-3 bg-gray-700 text-white rounded-lg"
                >
                    <option value="latest">Sort by Latest</option>
                    <option value="oldest">Sort by Oldest</option>
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 bg-gray-700 text-white rounded-lg"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* News Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <div key={index} className="p-4 bg-gray-900/60 rounded-lg shadow-md hover:scale-105 transition-all">
                            <h3 className="text-lg font-semibold">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {article.title}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-300">{article.description}</p>
                            <p className="text-xs text-gray-500">🕒 {new Date(article.publishedAt).toLocaleString()}</p>
                            <button
                                onClick={() => handleReadLater(article)}
                                className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            >
                                📌 Save for Later
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No news articles match your filter.</p>
                )}
            </div>

            {/* Read Later Section */}
            {readLater.length > 0 && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">📌 Read Later</h2>
                    {readLater.map((article, index) => (
                        <div key={index} className="p-2 border-b border-gray-600">
                            <h3 className="text-lg font-semibold">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {article.title}
                                </a>
                            </h3>
                            <button
                                onClick={() => handleRemoveReadLater(article.url)}
                                className="mt-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                            >
                                ❌ Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
