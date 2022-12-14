import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { TodoFilter } from '../models';

@Component({
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
})
export class TodoFiltersComponent implements OnInit {
  public readonly todoFilter = TodoFilter;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}

  public clearCompletedTodos(): void {
    this.todoService.clearCompletedTodos();
  }

  public filterTodos(filter: TodoFilter): void {
    this.todoService.activeFilter$.next(filter);
    this.todoService.filterTodos(filter);
  }
}
