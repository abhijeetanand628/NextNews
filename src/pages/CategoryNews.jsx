import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

const CategoryNews = () => {

    const { category } = useParams()

    const API_KEY = import.meta.env.VITE_NEWS_API_KEY

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])

    const pageSize = 6
    const fetchSize = 30

    useEffect(() => {
        setCurrentPage(1)
        async function fetchCategoryNews() {
            try {
                setLoading(true)
                let url
                // Gaming doesn't exist as a NewsAPI category
                if (category === 'gaming') {
                    url = `https://newsapi.org/v2/everything?q=gaming&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
                } else {
                    url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`
                }
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
        fetchCategoryNews()
    }, [category])

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

    const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-10'>
            {/* HEADER */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold capitalize'>
                    {formattedCategory} News
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
            {/* LOADING */}
            {loading && (

                <p className='mt-8 text-gray-500'>
                    Loading {formattedCategory.toLowerCase()} news...
                </p>

            )}
            {/* ARTICLES */}
            {!loading && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8'>
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
                                {item.description && (

                                    <p className='text-gray-600 mt-3 line-clamp-3'>
                                        {item.description}
                                    </p>
                                )}
                                <p className='text-xs text-gray-500 mt-5'>
                                    {formatDateTime(item.publishedAt)}
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
            {!loading && articles.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* NO ARTICLES */}
            {!loading && articles.length === 0 && (
                <p className='mt-8 text-gray-500'>
                    No news found for this category.
                </p>
            )}
        </div>
    )
}

export default CategoryNews