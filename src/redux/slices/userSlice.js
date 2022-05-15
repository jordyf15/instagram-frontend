import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

export const register = createAsyncThunk(
  "user/register",
  async ({ username, email, fullname, password}, thunkAPI) => {
    try {
      await UserService.register({ email, username, fullname, password });
    } catch (error) {
      if (error.response.status === 409) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (userId, thunkAPI) => {
    try{
      const response = await UserService.getProfile(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({username, fullname, password, email, profilePic, userId}, thunkAPI) => {
    try {
      const response = await UserService.updateProfile({username, fullname, password, email, profilePic, userId});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteProfilePicture = createAsyncThunk(
  "user/deleteProfilePicture",
  async (userId, thunkAPI) => {
    try{
      const response = await UserService.deleteProfilePicture(userId);
      return response.data;
    }catch(error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login  = createAsyncThunk(
  "authentication/login",
  async ({ username, password }, thunkAPI) => {
    try{
      const response = await AuthService.login(username, password);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
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

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [updateProfile.fulfilled]: (state, action) => {
      return action.payload.user;
    },
    [deleteProfilePicture.fulfilled]: (state, action) => {
      return action.payload.user;
    },
    [getProfile.fulfilled]: (state, action) => {
      return action.payload.user;
    },
    [login.fulfilled]: (state, action) => {
      return action.payload.user;
    },
    [logout.fulfilled]: (state, action) => {
      // return null;
    }
  }
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;