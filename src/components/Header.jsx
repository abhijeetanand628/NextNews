import React, { useState } from 'react'
import { Menu, Search, UserRound } from "lucide-react";
import Categories from './Categories';
import { NavLink, useLocation  } from 'react-router-dom'

const Header = () => {

    const [showCategories, setShowCategories] = useState(false);

    const location = useLocation()

    const isNextNewsActive =
        location.pathname === '/' ||
        location.pathname.startsWith('/category/')

  return (
        <>
            <div className='w-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-5 sticky top-0 bg-white/70 backdrop-blur-xl z-50'>
                <div className='flex items-center gap-3 sm:gap-4'> 
                    <NavLink
                        to='/'
                        onClick={() => {
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }}
                        className={`cursor-pointer transition-colors text-sm sm:text-base ${
                            isNextNewsActive
                                ? 'font-bold text-black text-md md:text-xl'
                                : 'font-medium text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        NextNews
                    </NavLink>

                    <NavLink 
                        to='/community'
                        onClick={() => {
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }}
                        className={({isActive}) => `cursor-pointer transition-colors text-sm sm:text-base ${
                            isActive
                                ? 'font-bold text-black text-md md:text-xl'
                                : 'font-medium text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Community
                    </NavLink>
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

                    <button 
                        onClick={() => setShowCategories(true)} 
                        className='text-gray-600 hover:text-black cursor-pointer'
                    >
                        <Menu 
                            size={20} 
                            strokeWidth={2}   
                        />
                    </button>
                </div>
            </div>
            {/* Categories is OUTSIDE the glass-effect header */}
            <Categories
                isOpen={showCategories}
                onClose={() => setShowCategories(false)}
            />
        </>
    )
}

export default Header