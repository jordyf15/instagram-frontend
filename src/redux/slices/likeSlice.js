import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import likeService from '../../services/like.service';



const likeSlice = createSlice({
  name: 'like',
  initialState: [],
  extraReducers: {

  }
});

export default likeSlice.reducer;
