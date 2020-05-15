import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {TodosComponent} from "./todos/todos.component";


const routes: Routes = [
  { path: '', component: TodosComponent },
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
