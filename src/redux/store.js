import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import messageReducer from './slices/message';
import authenticationReducer from './slices/authentication';
import commentReducer from './slices/commentSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    authentication: authenticationReducer,
    comment: commentReducer,
  },
  devTools: true,
});