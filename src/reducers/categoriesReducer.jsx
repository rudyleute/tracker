import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const GermanId = uuidv4()
const LanguagesId = uuidv4()
const ListeningId = uuidv4()
const CookingId = uuidv4()

const cat = [
  { name: "Listening", colour: "#7ef542", id: ListeningId, parentId: GermanId, hasChildren: true },
  { name: "Reading", colour: "#7ef542", id: uuidv4(), parentId: GermanId, hasChildren: false },
  { name: "Writing", colour: "#7ef542", id: uuidv4(), parentId: GermanId, hasChildren: false },
  { name: "German", colour: "#7ef542", id: GermanId, parentId: LanguagesId, hasChildren: true },
  { name: "Learning languages", colour: "#7ef542", id: LanguagesId, parentId: null, hasChildren: true },
  { name: "Podcasts", colour: "#7ef542", id: uuidv4(), parentId: ListeningId, hasChildren: false },
  { name: "Movies", colour: "#7ef542", id: uuidv4(), parentId: ListeningId, hasChildren: false },
  { name: "Series", colour: "#7ef542", id: uuidv4(), parentId: ListeningId, hasChildren: false },
  { name: "Cooking", colour: "#425af5", id: CookingId, parentId: null, hasChildren: true },
  { name: "Breakfast", colour: "#425af5", id: uuidv4(), parentId: CookingId, hasChildren: false },
  { name: "Lunch", colour: "#425af5", id: uuidv4(), parentId: CookingId, hasChildren: false },
  { name: "Dinner", colour: "#425af5", id: uuidv4(), parentId: CookingId, hasChildren: false }
]

const categoriesAdapter = createEntityAdapter();
const initialState = categoriesAdapter.setAll(
  categoriesAdapter.getInitialState(),
  cat
)

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      //TODO add the saving logic for the backend
      categoriesAdapter.addOne(state, action.payload)
    },
    removeCategory: (state, action) => {
      //TODO add the saving logic for the backend
      categoriesAdapter.removeOne(state, action.payload);
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

export const { addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state) => state.categories);

export const selectAttachable = (state) => {
  const all = selectAllCategories(state)
  return all.filter(el => el.hasChildren === false)
}

export const selectFilteredAttachable = (state, filter) => {
  const all = selectAllCategories(state)

  return all.filter(el => el.hasChildren === false && el.name.toLowerCase().includes(filter.toLowerCase()))
}