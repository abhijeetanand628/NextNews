import React from 'react'
import { Menu, Search, UserRound } from "lucide-react";

const Header = () => {
  return (
    <div className='w-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-5 sticky top-0 bg-white z-50'>
        <div className='flex items-center gap-3 sm:gap-4'> 
            <h1 className="cursor-pointer transition-colors text-gray-800 hover:text-black text-lg sm:text-xl md:text-xl font-bold">
                NextNews
            </h1>

            <h1 className='cursor-pointer transition-colors text-gray-400 hover:text-black text-lg sm:text-xl md:text-xl'>
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
                />
            </button>
        </div>
    </div>
  )
}

export default Header