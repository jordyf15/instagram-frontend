import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import likeService from '../../services/like.service';

export const likePost = createAsyncThunk(
  'like/likePost',
  async (postId, thunkAPI) => {
    try{
      const response = await likeService.likePost(postId);
      console.log(response);
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deletePostLike = createAsyncThunk(
  'like/deletePostLike',
  async({postId, likeId}, thunkAPI) => {
    try{
      const response = await likeService.deletePostLike({postId, likeId});
      console.log(response);
    }catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const likeComment = createAsyncThunk(
  'like/likeComment',
  async({postId, commentId}, thunkAPI) => {
    try {
      const response = await likeService.likeComment({postId, commentId});
      console.log(response);
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteCommentLike = createAsyncThunk(
  'like/deleteCommentLike',
  async({postId, commentId, likeId}, thunkAPI) => {
      try {
        const response = await likeService.deleteCommentLike({postId, commentId, likeId});
        console.log(response);
      }catch(error) {
        return thunkAPI.rejectWithValue();
      }
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState: []
});

export default likeSlice.reducer;