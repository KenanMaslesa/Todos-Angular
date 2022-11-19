import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Todo, TodoFilter } from './models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  public activeFilter$: BehaviorSubject<TodoFilter> = new BehaviorSubject<TodoFilter>(TodoFilter.ALL);

  public todoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([
    { id: '1', title: 'Learn Angular', isCompleted: false },
    { id: '2', title: 'Learn React', isCompleted: false },
    { id: '3', title: 'Learn NgRx', isCompleted: false },
  ]);

  public numberOfLeftTodos$: Observable<number> = this.todoList$.pipe(
    map((items: Todo[]) => {
      const completedTodos = items.filter((todo) => todo.isCompleted);
      return items.length - completedTodos.length;
    })
  );

  public allTodos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([...this.todoList$.value]);


  public deleteTodo(TodoId: string): void {
    const newTodos = [...this.todoList$.value];
    this.todoList$.next(newTodos.filter((item) => item.id !== TodoId));
    this.allTodos$.next(this.todoList$.value);
  }

  public updateTodo(TodoId: string): void {
    const newTodos = [...this.todoList$.value];
    newTodos.map((item) => {
      if (item.id === TodoId) {
        item.isCompleted = !item.isCompleted;
      }
    });
    this.todoList$.next(newTodos);
    this.allTodos$.next(newTodos);
  }

  public addTodo(TodoText: string): void {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: TodoText,
      isCompleted: false,
    };
    this.todoList$.next([...this.todoList$.value, newTodo]);
    this.allTodos$.next([...this.allTodos$.value, newTodo]);
    // this.filterTodos(this.activeFilter$.value);
    this.filterTodos(TodoFilter.ALL);
    this.activeFilter$.next(TodoFilter.ALL);
  }

  public clearCompletedTodos(): void {
    const newTodos = [...this.allTodos$.value];
    const uncompletedTodos = newTodos.filter((todo) => !todo.isCompleted);
    this.todoList$.next(uncompletedTodos);
    this.allTodos$.next(uncompletedTodos);
  }

  public filterTodos(filter: TodoFilter): void {
    if (filter === TodoFilter.ACTIVE) {
      this.todoList$.next(this.allTodos$.value.filter((item) => !item.isCompleted));
    } else if (filter === TodoFilter.COMPLETED) {
      this.todoList$.next(this.allTodos$.value.filter((item) => item.isCompleted));
    } else if (filter === TodoFilter.ALL) {
      return this.todoList$.next(this.allTodos$.value);
    }
  }
}
