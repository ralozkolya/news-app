import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (params, { dispatch }) => {
    const { setLoading, setError } = newsSlice.actions
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const response = await axios.get(`/api/news`, { params })
      return response.data
    } finally {
      dispatch(setLoading(false))
    }
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsResponse: {
      totalResults: 0,
      articles: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers: {
    [fetchNews.fulfilled]: (state, action) => {
      state.newsResponse = action.payload
    },
    [fetchNews.rejected]: state => {
      state.error = 'Error retrieving news'
    },
  }
})

export const newsSelector = state => state.news

export default newsSlice.reducer
