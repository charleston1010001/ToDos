import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {TodosComponent} from "./todos/todos.component";
import {TodosListRoutingModule} from "./todos-list-routing.module";
import { TodoComponent } from './todos/todo/todo.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import * as fromTodosList from './store/todos-list.reducer';
import {TodosListEffects} from "./store/todos-list.effects";



@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    TodoDetailsComponent
  ],
  imports: [
    CommonModule,
    TodosListRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    StoreModule.forFeature(fromTodosList.todosListFeatureKey, fromTodosList.reducer),
    EffectsModule.forFeature([TodosListEffects])
  ]
})
export class TodosListModule { }
