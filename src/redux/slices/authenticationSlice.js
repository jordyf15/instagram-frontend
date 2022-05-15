import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import { setUser } from './userSlice';

export const login  = createAsyncThunk(
  "authentication/login",
  async ({ username, password }, thunkAPI) => {
    try{
      const response = await AuthService.login(username, password);
      localStorage.setItem('access_token', response.data.access_token);
      thunkAPI.dispatch(setUser(response.data.user));
      return response.data;
    } catch(error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async(_,thunkAPI) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoggedIn: false
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
  }
});

export default authenticationSlice.reducer;