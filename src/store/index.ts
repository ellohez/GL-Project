// This creates a Redux store, and also automatically configures the
// Redux DevTools extension so that you can inspect the store while developing.
import { configureStore } from "@reduxjs/toolkit";
// this is the only place these imports are allowed. everywhere else should
// use the app dispatch + app selector from this file
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { usersApiSlice } from "../services/usersAPI";
import newUserReducer from "./newUser/newUserSlice";
import signUpPagesReducer from "./signUpPages/signUpPagesSlice";
import userReducer from "./user/userSlice";

// Add the reducer for each slice here so that they
// are available thoughout the application
export const createStore = (preloadedState = {}) =>
  configureStore({
    preloadedState,
    reducer: {
      user: userReducer,
      newUser: newUserReducer,
      signUpPages: signUpPagesReducer,
      [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApiSlice.middleware),
  });

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
// https://redux-toolkit.js.org/usage/usage-with-typescript#configurestore
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof createStore>;

// Export hooks by extracting the (TS) type from the store
// these are renamed useApp... to prevent confusion
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
