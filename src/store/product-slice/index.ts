import { RequestStatus } from "@/constant";
import { ProductState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: ProductState = {
  productStatus: RequestStatus.IDLE,
  createProductStatus: RequestStatus.IDLE,
  editProductStatus: RequestStatus.IDLE,
  deleteProductStatus: RequestStatus.IDLE,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductRequest: (state, action: PayloadAction<any>) => {
      state.productStatus = RequestStatus.REQUESTING;
    },

    getProductSuccess: (state, action: PayloadAction<any>) => {
      state.productStatus = RequestStatus.SUCCESS;
      state.productData = action.payload;
    },

    getProductFail: (state, action: PayloadAction<any>) => {
      state.productStatus = RequestStatus.ERROR;
    },

    resetProductStatus: (state) => {
      state.productStatus = RequestStatus.IDLE;
      state.productData = undefined;
    },
  },
});

export default slice.actions;

export const useProductSlice = () => {
  return { actions: slice.actions };
};

export const ProductReducer = slice.reducer;
