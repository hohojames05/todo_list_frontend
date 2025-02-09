import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Guid } from "../utils/guid";
import { ApiResponse } from "../models/api-response";
import { TodoList } from "../models/todo-list.model";

const API_URL: string = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class TodoListService {
  constructor(protected http: HttpClient) {}

  get(params?: HttpParams): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}/todo_items`, {params});
  }

  create(params?: HttpParams): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_URL}/todo_items`, params);
  }

  update(id?: Guid, params?: HttpParams | TodoList[]): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${API_URL}/todo_items/${id}`, params);
  }

  delete(id?: Guid): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_URL}/todo_items/${id}`);
  }

  getStatus(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${API_URL}/todo_items/get_status`, {});
  }
}