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

    // Save to "Read Later" list
    const handleReadLater = (article) => {
        if (!readLater.some((saved) => saved.url === article.url)) {
            setReadLater([...readLater, article]);
        }
    };

    // Remove from "Read Later"
    const handleRemoveReadLater = (url) => {
        setReadLater(readLater.filter((article) => article.url !== url));
    };

    if (loading) return <p className="text-center text-gray-400">Loading news...</p>;

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">⚠️ News Not Found</h2>
                <p>Oops! We couldn't fetch news for "{query}". Try again later.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-black/30 backdrop-blur-lg text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">📰 Latest News about {query}</h2>

            {/* Search, Sorting & Category Selection */}
            <div className="mb-4 flex flex-col md:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Filter by keyword..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-2 text-black rounded-md"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 bg-gray-700 text-white rounded-md"
                >
                    <option value="latest">Sort by Latest</option>
                    <option value="oldest">Sort by Oldest</option>
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 bg-gray-700 text-white rounded-md"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* News Articles */}
            <div className="space-y-4">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <div key={index} className="p-4 bg-gray-900/60 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {article.title}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-300">{article.description}</p>
                            <p className="text-xs text-gray-500">Published: {new Date(article.publishedAt).toLocaleString()}</p>
                            <button
                                onClick={() => handleReadLater(article)}
                                className="mt-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            >
                                Save to Read Later
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
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
