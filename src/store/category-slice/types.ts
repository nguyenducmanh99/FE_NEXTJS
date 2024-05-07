import { RequestStatus } from "@/constant";
import { IUser } from "../type";

export interface CategoryState {
  categoryStatus: RequestStatus;
  createCategoryStatus: RequestStatus;
  editCategoryStatus: RequestStatus;
  deleteCategoryStatus: RequestStatus;
  categoryData?: ICategory[];
}

export interface ICategory {
  id: number;
  authorId: number;
  bannerUrl: string;
  title: string;
  description: string;
  createAt?: string | Date;
  updateAt?: string | Date;
  products: any;
  author: IUser;
}

export interface IMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, string][];
}
