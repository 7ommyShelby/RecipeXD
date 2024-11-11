import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation();

    return (
        <nav className='bg-black h-16 flex justify-between items-center content-center px-2 text-center text-white'>
            <Link to={'/'}>
                <h1 className={`font-semibold text-3xl ${location.pathname !== '/fav' ? 'text-green-900' : 'text-violet-500'} `}>Recipe Book</h1>
            </Link>
            <Link to={'/fav'}><h1 className={` font-semibold ${location.pathname === '/fav' ? 'text-green-900 underline' : 'text-violet-500'} `}>Favourites</h1></Link>
        </nav>
    )
}

export default Navbar
