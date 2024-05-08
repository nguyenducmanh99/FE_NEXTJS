import { LoginState } from "@/store/signin-slice/types";
import { UserState } from "./user-slice/types";
import { HistoryState } from "./history-slice/types";
import { MessageState } from "./message-slice/types";
import { CategoryState } from "./category-slice/types";
import { ProductState } from "./product-slice/types";
export * from "@/store/signin-slice/types";
export interface RootReducer {
  authInfo: LoginState;
  userInfo: UserState;
  history: HistoryState;
  message: MessageState;
  category: CategoryState;
  products: ProductState;
}
