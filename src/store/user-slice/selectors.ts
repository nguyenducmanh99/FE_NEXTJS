import { createSelector } from "@reduxjs/toolkit";
import { RootReducer } from "@/store/type";
import { initialState } from ".";

const selectSlice = (state: RootReducer) => state.userInfo || initialState;
export const selectUser = createSelector([selectSlice], (state) => state);
