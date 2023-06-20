import { RequestStatus } from "@/constant";

export interface HistoryState {
  historyStatus: RequestStatus;
  createHistoryStatus: RequestStatus;
}

export interface IHistory {
  id: number;
  authorId: number;
  authorUrl: string;
  action: string;
  categoryName: string;
  fullName: string;
  createAt: string;
  updateAt: string;
}
