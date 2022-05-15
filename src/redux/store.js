import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authenticationReducer from './slices/authenticationSlice';
import postReducer from './slices/postSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    authentication: authenticationReducer,
    post: postReducer,
  },
  devTools: true,
});