import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFavourite } from './reduxtk/slice';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar';

const Details = () => {

  const { id } = useParams();
  const data = useSelector((state) => state.results);
  const favour = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dup, setDup] = useState(false);

  useEffect(() => {
    !data && !favour && navigate('/');
  }, []);

  const recipe = data?.find((e) => e.id === id) || favour?.find((e) => e.id === id)

  useEffect(() => {
    if (recipe) {
      const duplicate = favour?.some((e) => e.id === recipe.id);
      setDup(duplicate);
    }
  }, [recipe, favour]);


  const addtoFavourite = (id) => {

    const duplicate = favour.find((e) => e.id === recipe.id);

    let newData;

    if (duplicate) {
      newData = favour.filter((e) => e.id !== duplicate.id);
    } else {
      newData = [...favour, recipe]
    }
    // localStorage.setItem("favourites", JSON.stringify(newData));
    dispatch(addFavourite(newData))

  }

  const recipeDetail = data?.find((e) => e.id === id) || favour?.find((e) => e.id === id)

  const ingredients = recipeDetail?.recipe.ingredientLines;

  console.log(recipeDetail);
  console.log("favourite", favour);

  // const fav = JSON.parse(localStorage.getItem('favourites'))
  // console.log(fav);

  return (
    <>
      <Navbar />
      <main className='bg-neutral-800 p-2 w-full flex-col md:flex-row text-gray-100 flex gap-3 min-h-screen h-full items-center'>
        {
          recipeDetail ?
            <>
              <div className='sm:w-[45%] w-full flex-col flex justify-center items-center'>
                <div className='w-[75%] min-w-60 min-h-60 h-[75%] overflow-hidden rounded-md'>
                  <img className='w-full h-full' src={recipeDetail.recipe.images["REGULAR"].url} alt="" />
                </div>
                <div>
                  <p className='capitalize'>Cuisine Type: {recipeDetail.recipe.cuisineType.map((e) => e + " ")}</p>
                  <button className='bg-red-600 p-2 rounded-md' onClick={() => addtoFavourite(id)}>{dup ? "Remove from favourites" : "Add to favourites"}</button>
                </div>
              </div>

              <div className='sm:w-[55%] w-full p-4 flex justify-center flex-col gap-3'>
                <h1 className='text-4xl underline capitalize'>{recipeDetail.recipe.label}</h1>
                <p>Calories: {Math.floor(recipeDetail.recipe.calories)}</p>
                {
                  ingredients.map((e, idx) => {
                    return (
                      <>
                        <div className='flex gap-2'>
                          <span>{idx + 1}:</span><p>{e}</p>
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </>
            :
            <>
              <div className='w-full h-full content-center text-center text-2xl'>
                <p>No data found...</p>
              </div>
            </>
        }
      </main>
    </>
  )
}

export default Details
