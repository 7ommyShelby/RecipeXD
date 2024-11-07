import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='bg-black h-16 flex justify-between items-center content-center px-2 text-center text-white'>
            <Link to={'/'}>
                <h1 className='text-4xl'>Recipe Book</h1>
            </Link>
            <Link to={'/fav'}><h1>Favourites</h1></Link>
        </nav>
    )
}

export default Navbar
