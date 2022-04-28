import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CommentService from '../../services/comment.service';

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId, thunkAPI) => {
    try{
      const response = await CommentService.getComments(postId)
      console.log(response);
      return response.data;
    }catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const postComment = createAsyncThunk(
  'comment/postComment', 
  async({postId, comment}, thunkAPI) => {
    try {
      const response = await CommentService.postComment({postId, comment})
      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

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

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async({postId, commentId}, thunkAPI) => {
    try {
      const response = await CommentService.deleteComment({postId, commentId})
      console.log(response);
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
)

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
});

export default commentSlice.reducer;
