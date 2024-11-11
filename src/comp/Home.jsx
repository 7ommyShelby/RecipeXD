import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link, useLocation } from 'react-router-dom'
import { addData } from './reduxtk/slice'
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {

    const dispatch = useDispatch();

    const api = import.meta.env.VITE_API;
    const appId = import.meta.env.VITE_APP_ID;

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const storedData = useSelector((state) => state.results)
    const [timer, setTimer] = useState(null);


    const searchRecipe = () => {
        if (!search.trim()) return;
        setLoading(true)
        try {
            axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${appId}&app_key=${api}`, {
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': 'en'
                }
            })
                .then((e) => {
                    setData(e.data.hits);
                    updatedData(e.data.hits);
                    setLoading(false)
                    // setSearch('');
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log("Something went wrong!", error);
        }
    }

    const updatedData = (data) => {

        const newData = data.map((e) => {
            const id = e.recipe.uri.split("recipe_")[1]
            return ({
                ...e, id: id
            })
        })
        dispatch(addData(newData))
    }

    const debounce = (func, delay) => {
        return (...args) => {
            if (timer) {
                clearTimeout(timer);
            }
            const newTimer = setTimeout(() => {
                func(...args);
                x++;
            }, delay);
            setTimer(newTimer);
        };
    };

    const debouncedSearchRecipe = debounce(searchRecipe, 2000);

    console.log("ORIGINAL", data);
    console.log("UPDATED", storedData);

    console.log(search);

    return (
        <>
            <div className='w-full flex justify-center mt-3 gap-2'>
                <input value={search} onKeyUp={debouncedSearchRecipe} onChange={(e) => { setSearch(e.target.value) }} className='bg-violet-900 px-2 py-1 rounded-lg w-1/2' type="text" placeholder='Enter your need...' name="" id="" />
                {/* <button className='bg-gray-700 px-2 py-1 rounded-xl' onClick={searchRecipe}>Search</button> */}
            </div>

            {
                storedData ? <>
                    <div className='flex gap-2 flex-wrap p-2 justify-evenly'>
                        {!loading ?
                            storedData.map((e, idx) => {
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
                            }) : <>
                                <div className='text-center h-full w-full content-center'>
                                    <p className='text-2xl'>Fetching data...</p>
                                </div>
                            </>
                        }
                    </div>
                </> : <>
                    <div className='text-center h-full w-full content-center'>
                        <p className='text-2xl'>Seek recipes by entering ingredients or dish names or nutrition type.</p>
                    </div>
                </>
            }



        </>
    )
}

export default Home
