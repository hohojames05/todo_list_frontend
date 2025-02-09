import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../shared/services/todo-list.service';
import { TodoList } from '../shared/models/todo-list.model';
import { ApiResponse } from '../shared/models/api-response';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Guid } from '../shared/utils/guid';
import { ConfirmationService } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { todo } from 'node:test';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  constructor(
    private todoListService: TodoListService,
    private confirmationService: ConfirmationService
  ) { }

  todoTitle: string = '';
  todoDescription: string = '';
  todoList: TodoList[] = [];
  statusOptions: any[] = [];
  editableId?: Guid | null = null;
  orderBy: string = "";

  ngOnInit(): void {
    this.todoListService.get().subscribe((response: ApiResponse): void => {
      this.todoList = response.data;
    });
  }

  addTask() {
    if (!!this.todoTitle) {
      const params = new HttpParams()
        .set('title', this.todoTitle)
        .set('description', this.todoDescription)
        .set('status', 'pending');
      this.todoListService.create(params).subscribe((response: ApiResponse): void => {
        this.todoList.push(response.data);
      });
    }
    this.todoTitle = '';
    this.todoDescription = '';
  }

  editTask(id?: Guid) {
    this.editableId = id;
    this.todoListService.getStatus().subscribe((response: ApiResponse): void => {
      this.statusOptions = response.data;
    });
  }

  saveTask(todoItem: TodoList) {
    const params = new HttpParams()
      .set('title', todoItem.title)
      .set('description', todoItem.description)
      .set('status', todoItem.status.toString());
    this.todoListService.update(todoItem.id, params).subscribe((response: ApiResponse): void => {
      this.editableId = null;
    });
  }

  removeTask(id?: Guid) {
    this.todoListService.delete(id).subscribe((): void => {
      const index = this.todoList.findIndex(item => item.id === id);
      if (index >= 0) {
        this.todoList.splice(index, 1);
      }
    });
  }

  drop(event: CdkDragDrop<TodoList[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  sortList(orderBy: string) {
    this.orderBy = orderBy;
    const params = new HttpParams()
      .set('order_by', this.orderBy);
    this.todoListService.get(params).subscribe((response: ApiResponse): void => {
      this.todoList = response.data;
    });
  }
}
