import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from '../reduxtk/slice'


export const store = configureStore({
    reducer: recipeReducer
})