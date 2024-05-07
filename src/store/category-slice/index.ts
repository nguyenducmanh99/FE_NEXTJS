import { RequestStatus } from "@/constant";
import { CategoryState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: CategoryState = {
  categoryStatus: RequestStatus.IDLE,
  createCategoryStatus: RequestStatus.IDLE,
  editCategoryStatus: RequestStatus.IDLE,
  deleteCategoryStatus: RequestStatus.IDLE,
};

const slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryRequest: (state, action: PayloadAction<any>) => {
      state.categoryStatus = RequestStatus.REQUESTING;
    },

    getCategorySuccess: (state, action: PayloadAction<any>) => {
      state.categoryStatus = RequestStatus.SUCCESS;
      state.categoryData = action.payload;
    },

    getCategoryFail: (state, action: PayloadAction<any>) => {
      state.categoryStatus = RequestStatus.ERROR;
    },

    resetCategoryStatus: (state) => {
      state.categoryStatus = RequestStatus.IDLE;
      state.categoryData = undefined;
    },
  },
});

export default slice.actions;

export const useCategorySlice = () => {
  return { actions: slice.actions };
};

export const CategoryReducer = slice.reducer;
