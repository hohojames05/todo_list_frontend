import { Guid } from "../utils/guid";

export interface TodoList {
  id?: Guid;
  title: string;
  description: string;
  status: number;
  updated_at?: string;
}