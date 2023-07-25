export const RequestStatus = {
  IDLE: "IDLE",
  REQUESTING: "REQUESTING",
  SUCCESS: "SUCCESS",
  RELOAD: "RELOAD",
  ERROR: "ERROR",
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export const PAGE = {
  DASHBOARD: "/dashboard",
  USERS: "/users",
  ERROR: "/404",
  PRODUCT: "/products",
  CATEGORY: "/category",
  PROFILE: "/profile",
} as const;

export enum IModalType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}
