import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {TodosComponent} from "./todos/todos.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {FinishedTodosComponent} from "./todos/finished-todos/finished-todos.component";


const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'done', component: FinishedTodosComponent },
  { path: 'new', component: TodoDetailsComponent },
  { path: ':id', component: TodoDetailsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
// @ts-ignore
export class TodosListRoutingModule { }
