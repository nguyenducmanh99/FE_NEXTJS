import { RequestStatus } from "@/constant";

export interface UserState {
  userStatus: RequestStatus;
  createUserStatus: RequestStatus;
  editUserStatus: RequestStatus;
  deleteUserStatus: RequestStatus;
  userDataRes?: IUserData;
  userCreateRes?: IUser;
}

export interface IUserData {
    data: IUser[];
    meta: IMeta;
    links: {
      current: string;
    }
}

export interface IUser {
  id: number;
  name: string;
  fullName: string;
  description: string;
  address: string;
  password?: string;
  phone: number;
  email: string;
  dateOfBirth: string;
  avatarUrl: null | string;
}

export interface IMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, string][];
}