import { configureStore } from '@reduxjs/toolkit'
import importSlice from './importSlice'
import newsSlice from './newsSlice'

const store = configureStore({
  reducer: {
    news: newsSlice,
    import: importSlice
  }
});

export default store;
