import React from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Categories = ({onClose, isOpen}) => {

    const categories = [
        "Technology",
        "General",
        "Gaming",
        "Health",
        "Business",
        "Sports",
        "Entertainment"
    ]

  return (
    <>
        {isOpen && (
            <div 
                className='fixed inset-0 bg-black/20 z-40' 
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

            {categories.map((category) => {
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