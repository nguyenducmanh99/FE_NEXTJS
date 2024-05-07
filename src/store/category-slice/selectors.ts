import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

const selectSlice = (state: RootReducer) => state.category || initialState;
export const selectCategory = createSelector([selectSlice], (state) => state);
