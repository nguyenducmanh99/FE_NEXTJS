import { combineReducers, configureStore } from "@reduxjs/toolkit";
import middleware, { sagaMiddleware } from "./middleware";
import rootSaga from "./saga";
import { LoginReducer } from "@/pages/auth/signin/slice";

const rootReducer = combineReducers({
  authInfo: LoginReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: true,
});

sagaMiddleware.run(rootSaga);
