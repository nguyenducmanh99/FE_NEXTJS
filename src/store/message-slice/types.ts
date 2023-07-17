import { RequestStatus } from "@/constant";

export interface MessageState {
  open: boolean;
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
}
