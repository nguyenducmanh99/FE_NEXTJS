import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import LoginSaga from "@/store/signin-slice/saga";
import UserSaga from "@/store/user-slice/saga";
import HistorySaga from "@/store/history-slice/saga";
import MessageSaga from "@/store/message-slice/saga";
import CategorySaga from "@/store/category-slice/saga";

export default function* rootSaga(): SagaIterator {
  yield all([fork(LoginSaga)]);
  yield all([fork(UserSaga)]);
  yield all([fork(HistorySaga)]);
  yield all([fork(MessageSaga)]);
  yield all([fork(CategorySaga)]);
}
