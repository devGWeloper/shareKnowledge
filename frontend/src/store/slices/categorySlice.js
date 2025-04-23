import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../api/categoryService';

export const getCategories = createAsyncThunk(
  'category/getAll',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
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

export const createCategory = createAsyncThunk(
  'category/create',
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryService.createCategory(categoryData, token);
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

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, categoryData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryService.updateCategory(id, categoryData, token);
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

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await categoryService.deleteCategory(id, token);
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

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer; 