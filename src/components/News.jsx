import React, { useEffect, useState } from 'react'

const News = () => {

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [article, setArticle] = useState([]);

  useEffect(() => {
    async function fetchHotTopics() {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`);

      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json();
      setArticle(data.articles)
      console.log(data.articles);
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

      {article.map((item, index) => (
        <div className='w-full rounded-xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-2'
          key={item.url}>
          <img 
            className="w-full h-[250px] md:h-full object-cover" 
            src={item.urlToImage} 
            alt={item.title}
          />
          <div className='p-4 flex flex-col justify-center'>
            <h2 className="text-xl md:text-2xl font-bold">{item.title}</h2>
            <p className="mt-3 text-gray-600">{item.description}</p>
            <p className="mt-4 text-sm text-gray-500">{item.source.name} • {item.publishedAt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default News