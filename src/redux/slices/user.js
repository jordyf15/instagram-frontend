import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/user.service';

export const register = createAsyncThunk(
  "user/register",
  async ({ username, email, fullname, password}, thunkAPI) => {
    try {
      const response = await UserService.register({ email, username, fullname, password });
      console.log('response register');
      console.log(response);
    } catch (error) {
      if (error.response.status === 409) {
        return thunkAPI.rejectWithValue({username: error.response.data.message});
      }
      return thunkAPI.rejectWithValue();
    }
  }
);
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async ({userId}, thunkAPI) => {
    try{
      const response = await UserService.getProfile(userId);
      console.log('response get profile');
      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
)
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({username, fullname, password, email, profilePic, userId}, thunkAPI) => {
    try {
      const response = await UserService.updateProfile({username, fullname, password, email, profilePic, userId});
      console.log('response update profile');
      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
)
const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  }
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;