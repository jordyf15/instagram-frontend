import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  devTools: true,
});