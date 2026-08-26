import React, { useEffect } from 'react'

const News = () => {

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    async function fetchHotTopics() {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?language=en&apiKey=${API_KEY}`);

      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json();
      console.log(data.sources);
    } catch (error) {
      console.log("Server error : ", error);
    }
  }
  fetchHotTopics()
  }, [])

  return (
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 py-4 sm:py-6 md:py-8'>
      <h1 className='font-bold text-4xl'>
        Hot Topics
      </h1>
    </div>
  )
}

export default News