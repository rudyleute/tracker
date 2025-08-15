import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from './reducers/categoriesReducer.jsx';

const store = configureStore({
  reducer: {
    categories: categoriesReducer
  }
})

export default store;