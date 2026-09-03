import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'
import NewsCardSkeleton from '../components/NewsCardSkeleton'

const SearchNews = () => {

    const location = useLocation()
    const query = new URLSearchParams(location.search).get("query") || ""

    const API_KEY = import.meta.env.VITE_NEWS_API_KEY

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        setCurrentPage(1)
    }, [query])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])

    const pageSize = 6

    useEffect(() => {
        setCurrentPage(1)
        async function fetchSearchNews() {
            if (!query) return;
            try {
                setLoading(true)
                const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const data = await response.json()
                setArticles(data.articles || [])
            } catch (error) {
                console.log("Server error:", error)
                setArticles([])
            } finally {
                setLoading(false)
            }
        }
        fetchSearchNews()
    }, [query])

    // Pagination calculation
    const totalPages = Math.ceil(articles.length / pageSize)

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    const currentArticles = articles.slice(startIndex, endIndex)


    const formatDateTime = (publishedAt) => {
        const date = new Date(publishedAt)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`
    }

    return (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-10'>
            {/* HEADER */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                    Search Results for: <span className='text-blue-500'>{query}</span>
                </h1>
                <div className='flex gap-3'>
                    <button
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(prev => prev - 1)
                            } else {
                                navigate(-1)
                                setTimeout(() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }, 100)
                            }
                        }}
                        className='px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 md:text-base bg-gray-100 text-gray-700 rounded-xl shadow-sm cursor-pointer hover:bg-gray-200 hover:shadow-md transition-all font-medium'
                    >
                        ← Back
                    </button>

                    <Link
                        to='/'
                        onClick={() => {
                            setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }, 100)
                        }}
                        className='px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 md:text-base bg-blue-500 text-white rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md transition-all font-medium'
                    >
                        Home
                    </Link>

                </div>
            </div>
            
            <div className='mt-6 border-b border-gray-400 pb-2 mb-6'>
                <h2 className='text-xl sm:text-2xl font-bold'>
                    Global News
                </h2>
            </div>

            {/* LOADING */}
            {loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4'>
                    {[...Array(6)].map((_, index) => (
                        <NewsCardSkeleton key={index} />
                    ))}
                </div>
            )}
            {/* ARTICLES */}
            {!loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {currentArticles.map((item) => (
                        <a
                            key={item.url}
                            href={item.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-white rounded-xl overflow-hidden shadow-sm block duration-300 hover:scale-105 hover:shadow-md border border-gray-300'
                        >
                            <img
                                className='w-full h-40 object-cover'
                                src={item.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
                                alt={item.title}
                            />
                            <div className='p-4'>

                                <h2 className='font-bold text-sm sm:text-base leading-snug line-clamp-2'>
                                    {item.title}
                                </h2>
                                {item.description && (

                                    <p className='text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3'>
                                        {item.description}
                                    </p>
                                )}
                                <p className='text-xs text-gray-500 mt-4'>
                                    {item.source?.name ? item.source.name : 'Unknown Source'}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            {!loading && articles.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* NO ARTICLES */}
            {!loading && articles.length === 0 && query && (
                <p className='mt-8 text-gray-500'>
                    No news found for "{query}".
                </p>
            )}
            
            {!query && (
                <p className='mt-8 text-gray-500'>
                    Please enter a search query.
                </p>
            )}
        </div>
    )
}

export default SearchNews
