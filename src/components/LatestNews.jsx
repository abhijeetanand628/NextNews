import React, { useEffect, useState } from 'react'

const LatestNews = () => {

    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

    const [article, setArticle] = useState([]);

    useEffect(() => {
        async function fetchLatestNews() {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`);

                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json();
                setArticle(data.articles);
                // console.log(data.articles);
            } catch (error) {
                console.log("Server error : ", error);
            }
        }
        fetchLatestNews()
    }, [])


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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-6'>
            {article.map((item) => (
                <a 
                    key={item.url}
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-white rounded-xl overflow-hidden shadow-sm block duration-300 hover:scale-110 hover:shadow-md'
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
                            <span className='mx-3'>•</span>
                            {item.source.name}
                        </p>
                    </div>
                </a>
            ))}
        </div>

    </div>
  )
}

export default LatestNews