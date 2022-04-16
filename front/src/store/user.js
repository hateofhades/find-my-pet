import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    picture: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;

      console.log(state.user);
    },
    logoutSuccess: (state, action) => {
      state.user = {};
    },
    changePicture: (state, action) => {
      state.user.picture = action.payload;
    },
    hydrate: (state, action) => {
      return action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, hydrate } = userSlice.actions;

export default userSlice.reducer;
