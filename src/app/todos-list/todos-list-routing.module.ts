import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {TodosListComponent} from "./todos-list.component";


const routes: Routes = [
  { path: '', component: TodosListComponent },
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
