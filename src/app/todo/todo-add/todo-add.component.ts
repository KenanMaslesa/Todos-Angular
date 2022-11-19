import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
})
export class TodoAddComponent implements OnInit {
  public form: FormGroup;

  constructor(private todoService: TodoService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      todoItemText: new FormControl(null),
    });
  }

  public submitForm(): void {
    this.todoService.addTodo(this.form.value.todoItemText);
    this.form.reset();
  }
}
