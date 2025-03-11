import { useEffect, useState } from "react";
import { fetchNews } from "../services/fetchNews";

export default function NewsWidget({ query }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function getNews() {
            const data = await fetchNews(query);
            setArticles(data);
        }
        getNews();
    }, [query]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Latest News on {query}</h2>
            <ul className="space-y-4">
                {articles.map((article, index) => (
                    <li key={index} className="border-b pb-3">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                            {article.title}
                        </a>
                        <p className="text-gray-600 text-sm">{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
