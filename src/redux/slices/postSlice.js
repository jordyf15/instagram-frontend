import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import likeService from '../../services/like.service';
import PostService from '../../services/post.service';

export const getPosts = createAsyncThunk(
  'post/getPost',
  async (_, thunkAPI) => {
    try{
      const response = await PostService.getPosts();
      return response.data;
    }catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({visualMedias, caption}, thunkAPI) => {
    try{
      const response = await PostService.createPost({visualMedias, caption});
      return response.data;
    } catch(error) {
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

export const likePost = createAsyncThunk(
  'like/likePost',
  async (postId, thunkAPI) => {
    try{
      const response = await likeService.likePost(postId);
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deletePostLike = createAsyncThunk(
  'like/deletePostLike',
  async({postId, likeId}, thunkAPI) => {
    try{
      await likeService.deletePostLike({postId, likeId});
      return postId;
    }catch(error) {
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
    [likePost.fulfilled]: (state, action) => {
      const index = state.findIndex((post)=>post.id === action.payload.like.resource_id);
      state[index].like=action.payload.like;
      state[index].like_count++;
    },
    [deletePostLike.fulfilled]: (state, action) => {
      const index = state.findIndex((post)=>post.id===action.payload);
      state[index].like = null;
      state[index].like_count--;
    },
  },
});

export default postSlice.reducer;