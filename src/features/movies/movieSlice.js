import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieService } from "./movieService";


const movieSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies:[],
    movie:[],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheMovie.pending, (state , action) => {
        state.isLoading = true
        state.isError = false
        state.isSuccess = false
      })
      .addCase(fetchTheMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allMovies = action.payload
      })
      .addCase(fetchTheMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      })
      .addCase(getSingleMovie.pending, (state , action) => {
        state.isLoading = true
         state.isError = false
        state.isSuccess = false
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movie = action.payload
        state.isError = false
      })
      .addCase(getSingleMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      })
  },
});

//  Fetching Bulk Movies
export const fetchTheMovie = createAsyncThunk(
  "MOVIES/FETCHMOVIES",
  async (_, thunkAPI) => {
    try {
      return await movieService.fetchMovie();
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch sinle movie
export const getSingleMovie = createAsyncThunk("SINGLE/MOVIE" , async(id , thunkAPI)=>{
  try {
    return await movieService.singleMovie(id);
  } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
})
export default movieSlice.reducer;
