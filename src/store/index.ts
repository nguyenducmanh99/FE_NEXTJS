import { useProductSlice } from "./product-slice/index";
import { useCategorySlice } from "./category-slice/index";
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
import { MessageReducer } from "./message-slice";
import { CategoryReducer } from "./category-slice/index";
import { ProductReducer } from "./product-slice";
export { useLoginSlice } from "@/store/signin-slice";
export { useUserSlice } from "@/store/user-slice";
export { useHistorySlice } from "@/store/history-slice";
export { useMessageSlice } from "@/store/message-slice";
export { useCategorySlice } from "@/store/category-slice";
export { useProductSlice } from "@/store/product-slice";
declare module "redux" {
  export interface Store {
    sagaTask: any;
  }
}

const rootReducer = combineReducers({
  authInfo: LoginReducer,
  userInfo: UserReducer,
  history: HistoryReducer,
  message: MessageReducer,
  category: CategoryReducer,
  products: ProductReducer,
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
