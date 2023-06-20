import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { sagaMiddleware } from "./middleware";
import rootSaga from "./saga";
import { LoginReducer } from "@/store/signin-slice";
import { UserReducer } from "./user-slice";
import { createWrapper } from "next-redux-wrapper";
import { HistoryReducer } from "./history-slice";
export { useLoginSlice } from "@/store/signin-slice";
export { useUserSlice } from "@/store/user-slice";
export { useHistorySlice } from "@/store/history-slice";
declare module "redux" {
  export interface Store {
    sagaTask: any;
  }
}

const rootReducer = combineReducers({
  authInfo: LoginReducer,
  userInfo: UserReducer,
  history: HistoryReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

// sagaMiddleware.run(rootSaga);
store.sagaTask = sagaMiddleware.run(rootSaga);
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
