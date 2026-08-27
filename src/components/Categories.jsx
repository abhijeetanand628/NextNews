import React from 'react'
import { X } from 'lucide-react'

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
    <div className={`fixed top-0 right-0 h-full w-full sm:w-70 bg-white/90 backdrop-blur-lg z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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

            {categories.map((category) => (
                <button
                    key={category}
                    className='text-left text-md py-2 px-2 text-gray-700 rounded hover:text-black hover:bg-gray-100 cursor-pointer'
                >
                    {category}
                </button>
            ))}

        </div>
    </div>
  )
}

export default Categories