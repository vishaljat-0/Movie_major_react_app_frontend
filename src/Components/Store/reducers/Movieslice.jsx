import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info:{}   ,
}
  export const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
    loadmovie:(state ,action ) =>{
        state.info = action.payload
    },
    removemovie:(state ,action ) =>{
        state.info = {}
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { loadmovie, removemovie,  } = MovieSlice.actions
  
  export default MovieSlice.reducer
  
  
