import { X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Categories = ({onClose, isOpen}) => {

    const location = useLocation();
    const isCategoryPage = location.pathname.startsWith('/category/');
    const currentCategoryFromUrl = isCategoryPage ? location.pathname.split('/')[2].toLowerCase() : null;

    const allCategories = [
        "Technology",
        "General",
        "Gaming",
        "Health",
        "Business",
        "Sports",
        "Entertainment"
    ]

    const activeCategory = allCategories.find(c => c.toLowerCase() === currentCategoryFromUrl);
    const displayedCategories = activeCategory 
        ? allCategories.filter(c => c !== activeCategory)
        : allCategories;

  return (
    <>
        {isOpen && (
            <div 
                className='fixed inset-0 bg-transparent z-40' 
                onClick={onClose}
            ></div>
        )}
        <div className={`fixed top-0 right-0 h-full w-full sm:w-70 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        >
        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-700'>
            <h1 className='font-bold text-lg'>
                Categories
            </h1>

            <button
                onClick={onClose}
                className='p-1 rounded-md hover:bg-gray-100 cursor-pointer'
            >
                <X size={20} />
            </button>
        </div>

         <div className='flex flex-col px-4 py-6 gap-3'>

            {activeCategory && (
                <>
                    <Link
                        to={`/category/${activeCategory.toLowerCase()}`}
                        onClick={onClose}
                        className='text-left text-md py-2 px-2 text-black font-bold underline rounded hover:bg-gray-100 cursor-pointer'
                    >
                        {activeCategory}
                    </Link>
                    <Link
                        to='/'
                        onClick={onClose}
                        className='text-left text-md py-2 px-2 text-gray-700 rounded hover:text-black hover:bg-gray-100 cursor-pointer'
                    >
                        Home
                    </Link>
                </>
            )}

            {displayedCategories.map((category) => {
                const categoryValue = category.toLowerCase()
                return (
                    <Link
                        key={category}
                        to={`/category/${categoryValue}`}
                        onClick={onClose}
                        className='text-left text-md py-2 px-2 text-gray-700 rounded hover:text-black hover:bg-gray-100 cursor-pointer'
                    >
                        {category}
                    </Link>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default Categories