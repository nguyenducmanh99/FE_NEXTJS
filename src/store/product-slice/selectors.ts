import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

const selectSlice = (state: RootReducer) => state.products || initialState;
export const selectProduct = createSelector([selectSlice], (state) => state);
