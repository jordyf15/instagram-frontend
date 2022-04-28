import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import { setUser } from './user';

export const login  = createAsyncThunk(
  "authentication/login",
  async ({ username, password }, thunkAPI) => {
    try{
      const response = await AuthService.login(username, password);
      localStorage.setItem('access_token', response.data.access_token);
      console.log('response login');
      console.log(response);
      thunkAPI.dispatch(setUser(response.data.user));
      return response.data;
    } catch(error) {
      if(error.response.status === 404) {
        return thunkAPI.rejectWithValue({username: error.response.data.message});
      } else if(error.response.status === 403) {
        return thunkAPI.rejectWithValue({password: error.response.data.message});
      }
      return thunkAPI.rejectWithValue();
    }
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
  }
});

export default authenticationSlice.reducer;