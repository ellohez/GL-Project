import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createInitialUserState } from "./state";

const userSlice = createSlice({
  name: "user",
  initialState: createInitialUserState,
  reducers: {
    setUserFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setUserLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
});

export const { setUserFirstName, setUserLastName, setUserId } =
  userSlice.actions;

export default userSlice.reducer;
