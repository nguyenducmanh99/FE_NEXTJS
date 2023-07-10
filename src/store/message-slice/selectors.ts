import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

export const selectMessageSlice = (state: RootReducer) =>
  state.message || initialState;
export const selectMessage = createSelector([selectMessageSlice], (state) => state);
