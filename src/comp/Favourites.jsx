import React from 'react'
import Navbar from './Navbar';
import Card from './Card';


const Favourites = () => {

    const fav = JSON.parse(localStorage.getItem('favourites'));
    console.log(fav);

    return (
        <>
            <Navbar />
            <div className='bg-neutral-800 flex-col h-screen  min-h-fit w-full flex gap-2  text-gray-100'>
                <h1>Favourties</h1>
                <div className='flex gap-2 justify-around flex-wrap'>
                    {
                        fav?.length != 0 ? fav.map((e, idx) => {
                            return (
                                <>
                                    <Card
                                        id={e.id}
                                        key={idx + '1'}
                                        label={e.recipe.label}
                                        meal={e?.recipe.mealType[0]}
                                        img={e?.recipe.images['REGULAR'].url}
                                    />
                                </>
                            )
                        }) : <><p>Add favourites</p></>
                    }
                </div>
            </div>
        </>
    )
}

export default Favourites
