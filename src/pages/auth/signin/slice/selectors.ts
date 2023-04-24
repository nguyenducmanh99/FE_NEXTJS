import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

const selectSlice = (state: RootReducer) => state.authInfo || initialState;
export const selectAuth = createSelector([selectSlice], (state) => state);
