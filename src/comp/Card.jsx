import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ meal, img,id }) => {

    return (
        <div className='w-60 min-w-48 p-1'>
            <Link to={`/${id}/details`}>
                <div className='rounded-t-2xl overflow-hidden'>
                    <img src={img} className='h-full w-full' alt="" />
                </div>
            </Link>
            <div>
                <p className='bg-purple-400 px-1 py-1 capitalize'>
                    {meal}
                </p>
            </div>
        </div>
    )
}

export default Card
