import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommentService from '../../services/comment.service';

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async({postId, commentId, comment}, thunkAPI) => {
    try {
      const response = await CommentService.updateComment({postId, commentId, comment})
      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  extraReducers: {
  
  }
});

export default commentSlice.reducer;
