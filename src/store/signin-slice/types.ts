import { RequestStatus } from "@/constant";

export interface LoginState {
  loginStatus: RequestStatus;
  userInfo?: IUser;
  auth?: IAuth;
  infoParty3rd?: IParty3rd;
}

export interface IUser {
  id: number;
  name: string;
  fullName: string;
  description: string;
  address: string;
  password: string;
  phone: number;
  email: string;
  dateOfBirth: string;
  avatarUrl: null | string;
}

export interface IParty3rd {
  email: string;
  image: string;
  name: string;
}
export interface IAuth {
  accessToken: string;
  expired: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}
