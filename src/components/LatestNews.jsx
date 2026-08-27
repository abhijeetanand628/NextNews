import React, { useEffect } from 'react'

const LatestNews = () => {

    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

    useEffect(() => {
        async function fetchLatestNews() {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`);

                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = response.json();
                console.log(data);
            } catch (error) {
                console.log("Server error : ", error);
            }
        }
        fetchLatestNews()
    }, [])


  return (
    <div className='w-full px-4 sm:px-8 md:px-16 lg:px-24 py-4 md:py-6'>
        <h1 className='font-bold text-3xl'>
            Latest News
        </h1>

    </div>
  )
}

export default LatestNews