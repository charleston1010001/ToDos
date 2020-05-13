import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodosListComponent} from "./todos-list.component";
import {TodosListRoutingModule} from "./todos-list-routing.module";



@NgModule({
  declarations: [
    TodosListComponent
  ],
  imports: [
    CommonModule,
    TodosListRoutingModule
  ]
})
export class TodosListModule { }
