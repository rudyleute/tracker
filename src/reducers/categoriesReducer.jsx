import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';

const cat = [
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Something",
    colour: "#425af5",
    id: [uuidv4()]
  }
]

const categoriesSlice = createSlice({
  name: "categories",
  initialState: cat,
  reducers: {
    addCategory: (state, action) => {
      //TODO add the saving logic for the backend
      state.push(action.payload)
      return state
    },
    removeCategory: (state, action) => {
      //TODO add the saving logic for the backend
      return state.filter(el => el.id !== action.payload)
    }
  }
})

export const createCategory = (category) => {
  return async dispatch => {
    dispatch(addCategory(category))
  }
}

export const deleteCategory = (id) => {
  return async dispatch => {
    dispatch(removeCategory(id))
  }
}

export const {addCategory, removeCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;

