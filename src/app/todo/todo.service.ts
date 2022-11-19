import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo, TodoFilter } from './models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  public activeFilter$: BehaviorSubject<TodoFilter> =
    new BehaviorSubject<TodoFilter>(TodoFilter.ALL);

  public todoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([
    { id: '1', title: 'Learn Angular', isCompleted: false },
    { id: '2', title: 'Learn NgRx', isCompleted: false },
    { id: '3', title: 'Learn NgXs', isCompleted: false },
    { id: '4', title: 'Learn React', isCompleted: false },
  ]);

  public numberOfLeftTodos$: Observable<number> = this.todoList$.pipe(
    map((items: Todo[]) => {
      const completedTodos = items.filter((todo) => todo.isCompleted);
      return items.length - completedTodos.length;
    })
  );

  public allTodos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([
    ...this.todoList$.value,
  ]);

  public deleteTodo(todoId: string): void {
    const newTodos = [...this.todoList$.value];
    this.todoList$.next(newTodos.filter((item) => item.id !== todoId));
    this.allTodos$.next(this.allTodos$.value.filter((item) => item.id !== todoId));
  }

  public updateTodo(todoId: string): void {
    const newTodos = [...this.todoList$.value];
    newTodos.map((item) => {
      if (item.id === todoId) {
        item.isCompleted = !item.isCompleted;
      }
    });
    this.todoList$.next(newTodos);
    this.allTodos$.next(newTodos);
  }

  public addTodo(todoText: string): void {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: todoText,
      isCompleted: false,
    };
    this.todoList$.next([...this.todoList$.value, newTodo]);
    this.allTodos$.next([...this.allTodos$.value, newTodo]);
    this.filterTodos(TodoFilter.ALL);
    this.activeFilter$.next(TodoFilter.ALL);
  }

  public clearCompletedTodos(): void {
    const newTodos = [...this.allTodos$.value];
    const uncompletedTodos = newTodos.filter((todo) => !todo.isCompleted);
    this.todoList$.next(uncompletedTodos);
    this.allTodos$.next(uncompletedTodos);
    this.activeFilter$.next(TodoFilter.ALL);
  }

  public filterTodos(filter: TodoFilter): void {
    const allTodos = [...this.allTodos$.value];
    if (filter === TodoFilter.ACTIVE) {
      this.todoList$.next(allTodos.filter((item) => !item.isCompleted));
    } else if (filter === TodoFilter.COMPLETED) {
      this.todoList$.next(allTodos.filter((item) => item.isCompleted));
    } else if (filter === TodoFilter.ALL) {
      return this.todoList$.next(allTodos);
    }
  }
}
