import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  public todolist$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todolist$ = this.todoService.todoList$;
  }

  public myTrackByFn(index: number, element: Todo): string {
    return element.id;
  }

  public updateTodo = (todoItemId: string): void => {
    this.todoService.updateTodo(todoItemId);
  };

  public deleteTodo = (todoItemId: string): void => {
    console.log(todoItemId);
    this.todoService.deleteTodo(todoItemId);
  };
}
