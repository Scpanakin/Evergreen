"use client";

import { useState, useEffect } from "react";

interface NewsImage {
  size: string;
  url: string;
}

interface NewsArticle {
  author: string;
  content: string;
  created_at: string;
  headline: string;
  id: number;
  images: NewsImage[];
  source: string;
  summary: string;
  symbols: string[];
  updated_at: string;
  url: string;
}

interface NewsResponse {
  news: NewsArticle[];
  next_page_token: string;
}

export default function News() {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        if (!backendUrl) {
            console.error("Backend URL is not defined");
            return;
        }

        try {
            setLoading(true);
            console.log("About to fetch")
            const response = await fetch(`${backendUrl}news`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Completed Fetch")
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: NewsResponse = await response.json();
            setNewsArticles(data.news);
        } catch (error: any) {
            console.error("Error fetching news:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Format date to a more readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="h-full flex flex-col bg-evergray-400 overflow-hidden">
            <div className="p-3 font-semibold">
                <h2>Latest News</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center p-4">
                        <p>Loading news...</p>
                    </div>
                ) : newsArticles.length === 0 ? (
                    <div className="flex justify-center items-center p-4">
                        <p>No news articles available.</p>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-3 px-3 pb-3">
                        {newsArticles.map((article, index) => (
                            <div 
                                key={article.id || index} 
                                className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Image */}
                                <div className="flex-shrink-0 w-24 sm:w-32 relative">
                                    {article.images && article.images.length > 0 ? (
                                        <div className="relative h-full w-full">
                                            <img 
                                                src={article.images.find(img => img.size === "small")?.url || article.images[0].url} 
                                                alt={article.headline}
                                                className="h-full w-full object-cover" 
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 p-3">
                                    <div className="flex flex-col h-full justify-between">
                                        {/* Header */}
                                        <div>
                                            <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                                                <a 
                                                    href={article.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="hover:text-blue-600 transition-colors duration-200 text-gray-600"
                                                >
                                                    {article.headline}
                                                </a>
                                            </h3>
                                            
                                            {article.summary && (
                                                <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                                                    {article.summary}
                                                </p>
                                            )}
                                        </div>
                                        
                                        {/* Footer */}
                                        <div className="mt-1 flex flex-wrap justify-between items-center text-xs text-gray-500">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xs">{article.author || article.source}</span>
                                                <span className="text-xs">{formatDate(article.created_at)}</span>
                                            </div>
                                            
                                            {article.symbols && article.symbols.length > 0 && (
                                                <div className="mt-1 sm:mt-0">
                                                    <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                                                        {article.symbols.join(', ')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
