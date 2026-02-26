import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment as delComment,
  getPostComments,
} from '../api/comments';
import { Comment } from '../types/Comment';

/* eslint-disable no-param-reassign */

const initialState = {
  comments: [] as Comment[],
  error: '',
  commentsIsLoading: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    delComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.commentsIsLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.commentsIsLoading = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.commentsIsLoading = false;
    });

    builder.addCase(addComment.pending, state => {
      state.commentsIsLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.commentsIsLoading = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.commentsIsLoading = false;
    });

    builder.addCase(deleteComment.pending, state => {
      state.commentsIsLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.commentsIsLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.commentsIsLoading = false;
    });
  },
});

export default commentsSlice.reducer;
