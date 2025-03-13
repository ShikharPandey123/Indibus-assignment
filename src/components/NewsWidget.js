import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsWidget({ query }) {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [sortOrder, setSortOrder] = useState("latest"); // latest or oldest
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&language=en&sortBy=publishedAt`
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
    }, [query]);

    // Handle keyword-based filtering
    useEffect(() => {
        let filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.description.toLowerCase().includes(keyword.toLowerCase())
        );

        // Apply sorting
        if (sortOrder === "latest") {
            filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else {
            filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        }

        setFilteredArticles(filtered);
    }, [keyword, sortOrder, articles]);

    if (loading) return <p className="text-center text-gray-400">Loading news...</p>;

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                <h2 className="text-lg font-bold">⚠️ News Not Found</h2>
                <p>Oops! We couldn't fetch news for "{query}". Try again later.</p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">📰 Latest News about {query}</h2>

            {/* Keyword Search & Sorting */}
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
            </div>

            {/* News Articles */}
            <div className="space-y-4">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <div key={index} className="p-4 bg-gray-900 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    {article.title}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-300">{article.description}</p>
                            <p className="text-xs text-gray-500">Published: {new Date(article.publishedAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No news articles match your filter.</p>
                )}
            </div>
        </div>
    );
}
