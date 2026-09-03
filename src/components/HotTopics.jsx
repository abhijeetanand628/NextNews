import { useEffect, useState, useRef } from 'react'

const HotTopics = () => {

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [article, setArticle] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(5000);

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

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % article.length
      );
      remainingTimeRef.current = 5000;
      startTimer();
    }, remainingTimeRef.current);
  }

  // Pause timer
  const pauseTimer = () => {
    clearTimeout(timeoutRef.current);
    const elapsedTime =
      Date.now() - startTimeRef.current;
    remainingTimeRef.current =
      remainingTimeRef.current - elapsedTime;
  }

  // Mouse enters
  const handleMouseEnter = () => {
    pauseTimer();
  }

  // Mouse leaves
  const handleMouseLeave = () => {
    startTimer();
  }

  useEffect(() => {
    if (article.length === 0)
      return;

    remainingTimeRef.current = 5000;
    startTimer();
    return () => {
      clearTimeout(timeoutRef.current);
    }
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

      <div 
        className='mt-8 grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-6'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

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