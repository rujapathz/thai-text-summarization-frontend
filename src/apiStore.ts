import { configureStore } from '@reduxjs/toolkit';
import { summarizeApi } from './services/summarizeApi';

const apiStore = configureStore({
  reducer: {
    [summarizeApi.reducerPath]: summarizeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(summarizeApi.middleware),
});

export default apiStore;
