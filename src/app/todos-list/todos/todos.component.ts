import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {TodoModel} from "../../models/todo.model";
import {getTodosList} from "../store/todos-list.selectors";
import {AppState} from "../../app.module";
import * as TodosListActions from '../store/todos-list.actions';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  private storeSub = null;
  public todosList = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(getTodosList).subscribe((todos: TodoModel[]) => {
      this.todosList = todos;
    });

    this.store.dispatch(TodosListActions.startFetchTodos());
  }

  ngOnDestroy() {
    this.storeSub && this.storeSub.unsubscribe();
  }
}
