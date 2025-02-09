import { Guid } from "../utils/guid";

export interface TodoList {
  id?: Guid;
  title: string;
  description: string;
  status: string;
  updated_at?: string;
}