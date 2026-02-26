import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

/* eslint-disable no-param-reassign */

const initialState = {
  users: null as User[] | null,
  error: '',
  usersIsLoading: false,
  currentUser: null as User | null,
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.usersIsLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersIsLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.usersIsLoading = false;
    });
  },
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
