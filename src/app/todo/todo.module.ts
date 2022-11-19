import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoFiltersComponent } from './todo-filters/todo-filters.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoAddComponent,
    TodoListComponent,
    TodoFiltersComponent,
    TodoItemComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  exports: [TodoAddComponent, TodoListComponent, TodoFiltersComponent],
})
export class TodoModule {}
