import { TodoModule } from './todo/todo.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodoModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
