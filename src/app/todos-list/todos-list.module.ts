import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodosComponent} from "./todos/todos.component";
import {TodosListRoutingModule} from "./todos-list-routing.module";



@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    TodosListRoutingModule
  ]
})
export class TodosListModule { }
