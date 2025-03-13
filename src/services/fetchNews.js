import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines"; 

export async function fetchNews(query) {
    try {
        if (!API_KEY) {
            throw new Error("API key is missing. Check your .env file.");
        }

        const response = await axios.get(BASE_URL, {
            params: {
                q: query,
                from: new Date().toISOString().split("T")[0], // Use today's date
                sortBy: "publishedAt",
                apiKey: API_KEY
            },
            headers: {
                "Accept": "application/json",
            }
        });
        console.log("API Key:", API_KEY);
        return response.data.articles || [];
    } catch (error) {
        console.error("❌ Error fetching news data:", error.response?.data || error.message);
        return [];
    }
}
