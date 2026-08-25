import React from 'react'
import { Menu, Search, UserRound } from "lucide-react";

const Header = () => {
  return (
    <div className='flex mt-5 sticky'>
        <div className='flex gap-4 ml-20 '> 
            <h1 className="cursor-pointer transition-colors text-gray-800 hover:text-black text-lg sm:text-xl md:text-xl font-bold">
                NextNews
            </h1>

            <h1 className='cursor-pointer transition-colors text-gray-400 hover:text-black text-lg sm:text-xl md:text-xl'>
                Community
            </h1>
        </div>

        <div className='flex gap-8 ml-255'>
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