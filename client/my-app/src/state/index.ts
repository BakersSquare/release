import { createSlice } from "@reduxjs/toolkit"

// Logic needed for react redux. Update this as we need it.

const initialState = {
  user: null,
  token: null,
  houses: []
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;