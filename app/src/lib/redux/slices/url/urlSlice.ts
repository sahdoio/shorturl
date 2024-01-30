import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { shortenUrlThunk } from "./thunks"

export interface ShortenUrlSliceState {
  shortUrl?: string|null
}

const initialState: ShortenUrlSliceState = { shortUrl: null }
export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    clearUrlState: (state) => {
      state.shortUrl = initialState.shortUrl
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrlThunk.fulfilled, (state, action) => {
        // @ts-ignore
        state.shortUrl = action.payload
      })
  },
})
