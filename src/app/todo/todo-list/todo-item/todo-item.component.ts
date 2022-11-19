import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input() todoItem: Todo;
  @Output() updateItem = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<string>();

  constructor() {}

  public updateTodo(todoItemId: string): void {
    this.updateItem.emit(todoItemId);
  }

  public deleteTodo(todoItemId: string): void {
    this.removeItem.emit(todoItemId);
  }
}
