import { useEffect, useState } from 'react'
import Pagination from './Pagination';
import NewsCardSkeleton from './NewsCardSkeleton';

const LatestNews = () => {

    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 8
    const fetchSize = 40

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    async function fetchNews() {
        try {
            setLoading(true)
            const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=${fetchSize}&apiKey=${API_KEY}`
            // console.log("Fetching:", url)
            const response = await fetch(url)
            // console.log("Status:", response.status)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()

            // console.log("totalResults:", data.totalResults)
            // console.log("articles length:", data.articles.length)
            // console.log(data.articles)
            // console.log("NewsAPI:", data)

            setArticle(data.articles || [])
        } catch (error) {
            console.log("Server error : ", error)
            setArticle([])
        } finally {
            setLoading(false)
        }
    }
    fetchNews()
}, [])

    // PAGINATION
    const totalPages = Math.ceil(article.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentArticles = article.slice(startIndex, endIndex)
    const getTimeAgo = (publishedAt) => {
        const now = new Date();
        const publishedDate = new Date(publishedAt);
        const difference = now - publishedDate;
        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        if (minutes < 1) {
            return "Just now";
        }
        if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        }
        if (hours < 24) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        }
        return `${days} day${days > 1 ? "s" : ""} ago`;
    };

  return (
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 py-4 md:py-6'>
        <h1 className='font-bold text-3xl'>
            Latest News
        </h1>

        {loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-6'>
                    {[...Array(8)].map((_, index) => (
                        <NewsCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {/* ARTICLES */}
            {!loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-6'>
                    {currentArticles.map((item) => (
                        <a
                            key={item.url}
                            href={item.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-white rounded-xl overflow-hidden shadow-sm block duration-300 hover:scale-105 hover:shadow-md'
                        >
                            <img
                                className='w-full h-40 object-cover'
                                src={item.urlToImage}
                                alt={item.title}
                            />
                            <div className='p-4'>
                                <h2 className='font-bold text-lg leading-7 line-clamp-3'>
                                    {item.title}
                                </h2>
                                <p className='text-xs text-gray-500 mt-4'>
                                    {getTimeAgo(item.publishedAt)}
                                    <span className='mx-3'>
                                        •
                                    </span>
                                    {item.source?.name}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            {!loading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
    </div>
  )
}

export default LatestNews