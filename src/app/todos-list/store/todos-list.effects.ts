import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, withLatestFrom, exhaustMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {NotificationsService} from "../../notifications.service";
import * as TodosListActions from './todos-list.actions';
import {RestRequestService} from "../../rest-request.service";
import {AppState} from "../../app.module";
import * as fromTodosList from '../store/todos-list.reducer';

@Injectable()
export class TodosListEffects {
  constructor(
    private actions$: Actions,
    private notifications: NotificationsService,
    private restRequestService: RestRequestService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodosListActions.ADD_TODO),
    withLatestFrom(this.store.select(fromTodosList.todosListFeatureKey)),
    switchMap(([action, state]) => {
      const addAction: TodosListActions.ITodosListActions<TodosListActions.AddTodoProps> = action;
      return this.restRequestService.addTodo([...state.todos, addAction.todo]);
    })
  ), {dispatch: false});

  startFetchTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodosListActions.START_FETCH_TODOS),
    exhaustMap(() => {
      return this.restRequestService.fetchTodos().pipe(
        map((todos) => {
          return TodosListActions.fetchTodosSuccess({todos});
        })
      );
    }),
  ));
}
