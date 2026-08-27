import React, { useEffect, useState } from 'react'

const HotTopics = () => {

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [article, setArticle] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchHotTopics() {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`);

      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json();
      setArticle(data.articles)
      // console.log(data.articles);
    } catch (error) {
      console.log("Server error : ", error);
      alert(error.message);
    }
  }
  fetchHotTopics()
  }, [])

  useEffect(() => {
    if(article.length === 0)
      return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % article.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [article]) 

    if (article.length === 0) {
      return null;
    }


    const item = article[currentIndex];

    const publishedDate = new Date(item.publishedAt);
    const now = new Date();
    const difference = now - publishedDate;
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

    const timeAgo = daysAgo === 0
      ? "Today"
      : `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;


  return (
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 py-4 sm:py-6 md:py-8'>
      <h1 className='font-bold text-4xl'>
        Hot Topics
      </h1>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-6'>

      {/* LEFT - IMAGE */}
        <div className='relative h-[360px] rounded-xl overflow-hidden'>

          <img
            className='w-full h-full object-cover'
            src={item.urlToImage}
            alt={item.title}
          />

          {/* Dark overlay */}
          <div className='absolute inset-0 bg-black/40'></div>

          {/* Text on image */}
          <div className='absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white'>

            <h2 className='text-2xl md:text-4xl font-bold leading-tight'>
              {item.title}
            </h2>

            <p className='mt-5 text-sm md:text-base'>
              {timeAgo}
              <span className='mx-3'>•</span>
              {item.source.name}
            </p>

          </div>

        </div>

        {/* RIGHT - DESCRIPTION */}
        <div className='flex flex-col justify-center'>

          <h2 className='text-2xl md:text-2xl font-serif leading-relaxed'>
            {item.description}
          </h2>

          <p className='mt-8 text-sm md:text-base text-gray-700 leading-relaxed'>
            {item.description}
            <a href={item.url} target='_blank' rel='noopener noreferrer'
              className='ml-2 underline text-gray-700 cursor-pointer hover:text-black'>
              read more
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HotTopics