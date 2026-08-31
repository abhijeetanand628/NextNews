import React, { useState } from 'react'
import { Menu, Search, UserRound } from "lucide-react";
import Categories from './Categories';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

    const [showCategories, setShowCategories] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation()
    const navigate = useNavigate()

    const isNextNewsActive =
        location.pathname === '/' ||
        location.pathname.startsWith('/category/') ||
        location.pathname.startsWith('/search')

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
                    

                    <div className='flex items-center gap-2'>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (searchQuery.trim()) {
                                    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
                                    setSearchQuery('')
                                    setIsSearchOpen(false)
                                }
                            }}
                            className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ${isSearchOpen ? 'w-24 sm:w-32 md:w-48 lg:w-64 opacity-100' : 'w-0 opacity-0'}`}
                        >
                            <input
                                type='text'
                                placeholder='Search...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full outline-none text-md border border-black rounded-lg px-2 py-1 bg-slate-50 placeholder:text-gray-400 focus:bg-slate-100'
                            />
                        </form>
                        <button 
                            type='button'
                            onClick={() => {
                                if (isSearchOpen && searchQuery.trim()) {
                                    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
                                    setSearchQuery('')
                                    setIsSearchOpen(false)
                                } else {
                                    setIsSearchOpen(!isSearchOpen)
                                }
                            }}
                            className='text-slate-700 hover:text-black cursor-pointer'
                        >
                            <Search 
                                size={20} 
                                strokeWidth={2}
                            />
                        </button>
                    </div>

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