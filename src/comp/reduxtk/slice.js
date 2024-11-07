import { createSlice } from "@reduxjs/toolkit";
import Favourites from './../Favourites';

const initialState = {
    results: null,
    favourites: JSON.parse(localStorage.getItem("favourites")) || []
}

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,

    reducers: {
        addData: (state, action) => {
            state.results = action.payload
        },
        addFavourite: (state, action) => {
            state.favourites = action.payload
            localStorage.setItem("favourites", JSON.stringify(state.favourites));
        }
    }
})


export const { addData, addFavourite } = recipeSlice.actions;
export default recipeSlice.reducer