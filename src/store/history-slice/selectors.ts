import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

const selectSlice = (state: RootReducer) => state.history || initialState;
export const selectHistory = createSelector([selectSlice], (state) => state);
