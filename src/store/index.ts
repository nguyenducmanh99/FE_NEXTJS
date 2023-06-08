import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import middleware, { sagaMiddleware } from "./middleware";
import rootSaga from "./saga";
import { LoginReducer } from "@/store/signin-slice";
import { UserReducer } from "./user-slice";
import { createWrapper } from "next-redux-wrapper";
export { useLoginSlice } from "@/store/signin-slice"
export { useUserSlice }from "@/store/user-slice"
declare module "redux" {
  export interface Store {
    sagaTask: any
  }
}

const rootReducer = combineReducers({
  authInfo: LoginReducer,
  userInfo: UserReducer,
});
export const store =  configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: true,
});

sagaMiddleware.run(rootSaga);
store.sagaTask = sagaMiddleware.run(rootSaga)
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
const STORE = () => store;
export const wrapper: any = createWrapper<AppStore>(STORE);
