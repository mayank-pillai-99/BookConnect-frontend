import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      // Append new users to existing feed instead of replacing
      return [...(state || []), ...action.payload];
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = (state || []).filter((user) => user._id !== action.payload);
      return newFeed;
    },
    clearFeed: (state, action) => {
      return [];
    },
  },
});

export const { addFeed, removeUserFromFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
