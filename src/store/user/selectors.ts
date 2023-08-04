import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../index";

const selectUserState = (state: RootState) => state.user;

export const selectUserFirstName = createSelector(
  [selectUserState],
  (userState) => userState.firstName
);

export const selectUserLastName = createSelector(
  selectUserState,
  (userState) => userState.lastName
);

export const selectUserFullname = createSelector(
  selectUserState,
  (userState) => `${userState.firstName} ${userState.lastName}`
);

export const selectSignUpComplete = createSelector(
  selectUserState,
  (userState) => userState.signUpComplete
);

export const selectUserId = createSelector(
  selectUserState,
  (userState) => userState.id
);
