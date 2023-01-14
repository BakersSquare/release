import { createSlice } from "@reduxjs/toolkit"
import { useActionData } from "react-router-dom";
import { AuthReduxState } from "../utils/types";

// Logic needed for react redux. Update this as we need it.

const initialState: AuthReduxState = {
  user: null,
  token: null
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

// Put these functions in a new slice
// 
// setHouses
// setHouses: (state, action) => {
//   state.houses = action.payload.houses;
// }

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;