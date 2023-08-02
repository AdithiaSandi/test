import { createSlice } from "@reduxjs/toolkit";

export const databaseSlice = createSlice({
  name: "database",
  initialState: {
    database: [{}],
  },
  reducers: {
    updateDatabase: (state, action) => {
      state.database = action.payload;
    },
  },
});

export const { updateDatabase } = databaseSlice.actions;

export const getDatabase = (state) => state.database;

export default databaseSlice.reducer;
