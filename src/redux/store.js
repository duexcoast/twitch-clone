import { combineReducers } from "redux";
import authReducer from "./features/authSlice";
import streamReducer from "./features/streamSlice";

export default combineReducers({
  auth: authReducer,
  streamState: streamReducer,
});
