import { RequestStatus } from "@/constant";
import { IUser } from "../type";

export interface MessageState {
  open: boolean;
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
  conversationStatus: RequestStatus;
  conversationData?: IConversation[];
}
export interface IConversation {
  id: number;
  message: string;
  authorId: number;
  createAt: string;
  users: IUser;
}
