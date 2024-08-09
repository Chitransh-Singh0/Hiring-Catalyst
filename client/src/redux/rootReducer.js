import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

let rootReducer = combineReducers({
  user: userSlice,
});

export { rootReducer };