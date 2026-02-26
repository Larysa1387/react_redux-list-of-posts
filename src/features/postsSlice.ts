import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

/* eslint-disable no-param-reassign */

const initialState = {
  selectedPost: null as Post | null,
  posts: [] as Post[],
  postError: '',
  postsIsLoading: false,
};

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => {
      state.postsIsLoading = true;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.postsIsLoading = false;
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.postError = action.error.message || 'Something went wrong';
      state.postsIsLoading = false;
    });
  },
});

export const { setSelectedPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
