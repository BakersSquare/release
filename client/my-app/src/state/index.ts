import { createSlice } from "@reduxjs/toolkit"
import { useActionData } from "react-router-dom";

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
    },
    setHouses: (state, action) => {
      state.houses = action.payload.houses;
    }
  }
})

export const { setLogin, setLogout, setHouses} = authSlice.actions;
export default authSlice.reducer;