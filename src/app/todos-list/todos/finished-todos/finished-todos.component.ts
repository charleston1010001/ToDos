import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";

import {AppState} from "../../../app.module";
import {getFinishedTodosList} from "../../store/todos-list.selectors";
import {TodoModel} from "../../../models/todo.model";
import * as TodosListActions from "../../store/todos-list.actions";

@Component({
  selector: 'app-finished-todos',
  templateUrl: './finished-todos.component.html',
  styleUrls: ['./finished-todos.component.scss']
})
export class FinishedTodosComponent implements OnInit, OnDestroy {
  private storeSub = null;
  public todosList = [];

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(getFinishedTodosList).subscribe((todos: TodoModel[]) => {
      this.todosList = todos;
    });

    this.store.dispatch(TodosListActions.startFetchTodos());
  }

  onTodoCheckboxChange(event: {todo: TodoModel, isChecked: boolean}) {
    const {todo: {id, headline, text, dueDate} = {}, isChecked} = event;
    const newTodo = new TodoModel(id, headline, text, dueDate, isChecked);
    this.store.dispatch(TodosListActions.updateTodo({todo: newTodo, skipNavigation: true}));
  }

  ngOnDestroy() {
    this.storeSub && this.storeSub.unsubscribe();
  }
}
