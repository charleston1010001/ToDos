import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.storeSub = this.store.pipe(getTodosList).subscribe((todos: TodoModel[]) => {
      this.todosList = todos;
    });

    this.store.dispatch(TodosListActions.startFetchTodos());
  }

  navigateToNew() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  todoClick(event: {todo: TodoModel}) {
    this.router.navigate([event.todo.id], {relativeTo: this.route});
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
