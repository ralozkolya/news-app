import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchImport = createAsyncThunk(
  'import/fetch',
  async (_, { dispatch, getState }) => {
    const { setLoading, setSuccess, setErrors } = importSlice.actions
    dispatch(setLoading(true))
    dispatch(setSuccess(null))

    const selected = getState().import.selected
    const payload = Object.values(selected)

    try {
      const response = await axios.post('/api/import', payload)
      return response.data
    } finally {
      dispatch(setLoading(false))
      setTimeout(() => {
        dispatch(setSuccess(null))
        dispatch(setErrors(null))
      }, 5000)
    }
  }
)

const importSlice = createSlice({
  name: 'import',
  initialState: {
    loading: false,
    success: null,
    errors: null,
    selected: {},
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setSuccess(state, action) {
      state.success = action.payload
    },
    setErrors(state, action) {
      state.errors = action.payload
    },
    setSelected(state, { payload: { id, value } }) {
      if (value) {
        state.selected[id] = value
      } else {
        delete state.selected[id]
      }
    },
  },
  extraReducers: {
    [fetchImport.fulfilled]: (state, action) => {
      state.success = action.payload.added
      state.errors = action.payload.errors
    },
    [fetchImport.rejected]: state => {
      state.errors = [ 'Error importing news' ]
    }
  }
})

export const importSelector = state => state.import
export const { setSelected } = importSlice.actions

export default importSlice.reducer
