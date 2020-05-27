import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";

import {TodosComponent} from "./todos/todos.component";
import {TodosListRoutingModule} from "./todos-list-routing.module";
import { TodoComponent } from './todos/todo/todo.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import * as fromTodosList from './store/todos-list.reducer';
import {TodosListEffects} from "./store/todos-list.effects";
import { FinishedTodosComponent } from './todos/finished-todos/finished-todos.component';



@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    TodoDetailsComponent,
    FinishedTodosComponent
  ],
  imports: [
    CommonModule,
    TodosListRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forFeature(fromTodosList.todosListFeatureKey, fromTodosList.reducer),
    EffectsModule.forFeature([TodosListEffects])
  ]
})
export class TodosListModule { }
