import { configureStore } from "@reduxjs/toolkit";
import token from "../features/token/tokenSlice";

export default configureStore({
  reducer: {
    token: token,
  },
});
