import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import messageReducer from './slices/message';
import authenticationReducer from './slices/authenticationSlice';
import commentReducer from './slices/commentSlice';
import postReducer from './slices/postSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    authentication: authenticationReducer,
    comment: commentReducer,
    post: postReducer,
  },
  devTools: true,
});