import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contentService from '../../api/contentService';

export const getContents = createAsyncThunk(
  'content/getAll',
  async (params, thunkAPI) => {
    try {
      return await contentService.getContents(params);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getContentById = createAsyncThunk(
  'content/getById',
  async (id, thunkAPI) => {
    try {
      return await contentService.getContentById(id);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createContent = createAsyncThunk(
  'content/create',
  async (contentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contentService.createContent(contentData, token);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateContent = createAsyncThunk(
  'content/update',
  async ({ id, contentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contentService.updateContent(id, contentData, token);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteContent = createAsyncThunk(
  'content/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await contentService.deleteContent(id, token);
      return id;
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeContent = createAsyncThunk(
  'content/like',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await contentService.likeContent(id, token);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  contents: [],
  currentContent: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearCurrentContent: (state) => {
      state.currentContent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contents = action.payload;
      })
      .addCase(getContents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentContent = action.payload;
      })
      .addCase(getContentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contents.push(action.payload);
      })
      .addCase(createContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contents = state.contents.map((content) =>
          content.id === action.payload.id ? action.payload : content
        );
        state.currentContent = action.payload;
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contents = state.contents.filter(
          (content) => content.id !== action.payload
        );
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeContent.fulfilled, (state, action) => {
        const { id, likeCount } = action.payload;
        
        if (state.currentContent && state.currentContent.id === id) {
          state.currentContent.likeCount = likeCount;
        }
        
        state.contents = state.contents.map((content) =>
          content.id === id ? { ...content, likeCount } : content
        );
      });
  },
});

export const { reset, clearCurrentContent } = contentSlice.actions;
export default contentSlice.reducer; 