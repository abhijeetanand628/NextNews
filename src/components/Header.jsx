import React, { useState } from 'react'
import { Menu, Search, UserRound } from "lucide-react";
import Categories from './Categories';

const Header = () => {

    const [showCategories, setShowCategories] = useState(false);

  return (
    <div className='w-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-5 sticky top-0 bg-white z-50'>
        <div className='flex items-center gap-3 sm:gap-4'> 
            <h1 className="cursor-pointer transition-colors text-gray-400 hover:text-gray-600 text-sm sm:text-base font-medium">
                NextNews
            </h1>

            <h1 className='cursor-pointer transition-colors font-medium text-gray-400 hover:text-gray-600 text-sm sm:text-base'>
                Community
            </h1>
        </div>

        <div className='flex gap-4 sm:gap-6 md:gap-8 items-center'>
            <button className='text-gray-600 hover:text-black cursor-pointer'>
                <UserRound 
                    size={20} 
                    strokeWidth={2}
                />
            </button>
            
            <button className='text-gray-600 hover:text-black cursor-pointer'>
                <Search 
                    size={20} 
                    strokeWidth={2}
                />
            </button>

            <button className='text-gray-600 hover:text-black cursor-pointer'>
                <Menu 
                    size={20} 
                    strokeWidth={2} 
                    onClick={() => setShowCategories(true)}   
                />
            </button>

            <Categories
                isOpen={showCategories}
                onClose={() => setShowCategories(false)}
            />
        </div>
    </div>
  )
}

export default Header