import { IProduct, RequestStatus } from "@/constant";

export interface ProductState {
  productStatus: RequestStatus;
  createProductStatus: RequestStatus;
  editProductStatus: RequestStatus;
  deleteProductStatus: RequestStatus;
  productData?: IProduct[];
}

export interface IMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, string][];
}
