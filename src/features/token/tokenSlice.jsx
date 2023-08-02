import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});
export const { addToken, removeToken } = tokenSlice.actions;

export const getToken = (state) => state.token.token;

export default tokenSlice.reducer;
