import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CommentService from '../../services/comment.service';
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
  'post/getUserPost',
  async (_, thunkAPI) => {
    try{
      const response = await PostService.getUserPosts();
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

export const getPostComments = createAsyncThunk(
  'comment/getPostComments',
  async (postId, thunkAPI) => {
    try{
      const response = await CommentService.getComments(postId)
      return response.data;
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
      return {...response.data, postId}
    } catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteCommentLike = createAsyncThunk(
  'like/deleteCommentLike',
  async({postId, commentId, likeId}, thunkAPI) => {
      try {
        await likeService.deleteCommentLike({postId, commentId, likeId});
        return {postId, commentId}
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: [],
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      return action.payload.posts;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      return action.payload.posts;
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
    [getPostComments.fulfilled]: (state, action) => {
      if(action.payload.comments){
        const index = state.findIndex((post) => post.id === action.payload.comments[0].post_id);
        state[index].comments = action.payload.comments;
      }
    },
    [likeComment.fulfilled]: (state, action) => {
      const postIndex = state.findIndex((post)=>post.id===action.payload.postId);
      const post = state[postIndex];
      const commentIndex = post.comments.findIndex((comment)=>comment.id===action.payload.like.resource_id);
      post.comments[commentIndex].like = action.payload.like; 
    },
    [deleteCommentLike.fulfilled]: (state, action) => {
      const postIndex = state.findIndex((post) => post.id === action.payload.postId);
      const post = state[postIndex];
      const commentIndex = post.comments.findIndex((comment) => comment.id === action.payload.commentId);
      post.comments[commentIndex].like = null;
    },
    [postComment.fulfilled]: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.comment.post_id);
      state[index].comments.push(action.payload.comment);
    },
  },
});

export default postSlice.reducer;