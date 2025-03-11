import axios from 'axios';

const API_KEY = 'da52e5299f224169bb6d20bc50dc942f';
const BASE_URL = 'https://newsapi.org/v2/everything';

export async function fetchNews(query) {
    try {
        const response = await axios.get(`${BASE_URL}?q=${query}&from=2025-02-11&sortBy=publishedAt&apiKey=${API_KEY}`);
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news data:", error);
        return [];
    }
}
