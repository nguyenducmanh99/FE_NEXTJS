import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

export const selectAuthSlice = (state: RootReducer) =>
  state.authInfo || initialState;
export const selectAuth = createSelector([selectAuthSlice], (state) => state);
