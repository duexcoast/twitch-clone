import { createSlice } from "@reduxjs/toolkit";
// import streams from "../../apis/streams";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: null,
    userId: null,
  },
  reducers: {
    signIn(state, action) {
      state.isSignedIn = true;
      state.userId = action.payload;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.userId = null;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice;
// Extract and export each action creator by name
export const { signIn, signOut } = actions;
// Export the reducer, either as a default or named export
export default reducer;
