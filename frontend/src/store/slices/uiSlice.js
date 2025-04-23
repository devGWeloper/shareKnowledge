import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: {
    open: false,
    message: '',
    type: 'info', // 'success', 'info', 'warning', 'error'
  },
  loading: {
    global: false,
    requests: {},
  },
  layout: {
    sidebarOpen: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideNotification: (state) => {
      state.notification.open = false;
    },
    startLoading: (state, action) => {
      const requestId = action.payload?.requestId;
      if (requestId) {
        state.loading.requests[requestId] = true;
      } else {
        state.loading.global = true;
      }
    },
    stopLoading: (state, action) => {
      const requestId = action.payload?.requestId;
      if (requestId) {
        delete state.loading.requests[requestId];
      } else {
        state.loading.global = false;
      }
    },
    toggleSidebar: (state) => {
      state.layout.sidebarOpen = !state.layout.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.layout.sidebarOpen = false;
    },
  },
});

export const {
  showNotification,
  hideNotification,
  startLoading,
  stopLoading,
  toggleSidebar,
  closeSidebar,
} = uiSlice.actions;

export default uiSlice.reducer; 