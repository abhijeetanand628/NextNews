const NewsCardSkeleton = () => {
  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-sm block animate-pulse'>
        {/* Image Placeholder */}
        <div className='w-full h-40 bg-gray-200'></div>
        
        {/* Content Placeholder */}
        <div className='p-4'>
            {/* Title Placeholders */}
            <div className='h-5 bg-gray-200 rounded w-full mb-2'></div>
            <div className='h-5 bg-gray-200 rounded w-5/6 mb-4'></div>
            
            {/* Meta info placeholder */}
            <div className='h-3 bg-gray-200 rounded w-1/2 mt-4'></div>
        </div>
    </div>
  )
}

export default NewsCardSkeleton
