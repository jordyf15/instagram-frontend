import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../services/post.service';

export const getPosts = createAsyncThunk(
  'post/getPost',
  async (_, thunkAPI) => {
    try{
      const response = await PostService.getPosts();
      console.log('response get post');
      console.log(response);
      return response.data;
    }catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({visualMedias, caption}, thunkAPI) => {
    console.log(visualMedias);
    try{
      const response = await PostService.createPost({visualMedias, caption});
      console.log(response);
      return response.data;
    } catch(error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getUserPosts = createAsyncThunk(
  'post/createPost',
  async (_, thunkAPI) => {
    try{
      const response = await PostService.getUserPosts();
      console.log(response);
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async({postId, caption}, thunkAPI) => {
    try{
      const response = await PostService.updatePost({postId, caption});
      console.log(response);
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async(postId, thunkAPI) => {
    try{
      const response = await PostService.deletePost(postId);
      console.log(response);
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);


const postSlice = createSlice({
  name: 'post',
  initialState: [],
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      return action.payload.posts
    },
    [createPost.fulfilled]: (state, action) => {
      state.push(action.payload.post);
    },
  },
});

export default postSlice.reducer;