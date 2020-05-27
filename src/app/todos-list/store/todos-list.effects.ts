import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, withLatestFrom, exhaustMap, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";

import {NotificationsService} from "../../notifications.service";
import * as TodosListActions from './todos-list.actions';
import {RestRequestService} from "../../rest-request.service";
import {AppState} from "../../app.module";
import * as fromTodosList from '../store/todos-list.reducer';
import {TodoModel} from "../../models/todo.model";

@Injectable()
export class TodosListEffects {
  constructor(
    private actions$: Actions,
    private notifications: NotificationsService,
    private restRequestService: RestRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodosListActions.ADD_TODO),
    withLatestFrom(this.store.select(fromTodosList.todosListFeatureKey)),
    switchMap(([action, state]) => {
      const addAction: TodosListActions.ITodosListActions<TodosListActions.AddTodoProps> = action;
      return this.restRequestService.addTodo([...state.todos, addAction.todo]).pipe(
        map(() => {
          return TodosListActions.addTodoSuccess({isUpdate: false, skipNavigation: false});
        })
      );
    })
  ));

  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodosListActions.UPDATE_TODO),
    withLatestFrom(this.store.select(fromTodosList.todosListFeatureKey)),
    switchMap(([action, state]) => {
      const addAction: TodosListActions.ITodosListActions<TodosListActions.AddTodoProps> = action;
      const newTodos = [...state.todos];
      newTodos.splice(newTodos.findIndex((todo: TodoModel) => todo.id === addAction.todo.id), 1, addAction.todo);
      return this.restRequestService.addTodo(newTodos).pipe(
        map(() => {
          return TodosListActions.addTodoSuccess({isUpdate: true, skipNavigation: addAction.skipNavigation});
        })
      );
    })
  ));

  addTodoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TodosListActions.ADD_TODO_SUCCESS),
    tap((action: TodosListActions.ITodosListActions<TodosListActions.addTodoSuccessProps>) => {
      this.notifications.showNotification(`Todo ${action.isUpdate ? 'updated' : 'saved'} successfully.`);
      !action.skipNavigation && this.router.navigate(['list'], {relativeTo: this.route});
    }),
    map(() => {
      return TodosListActions.startFetchTodos();
    })
  ));

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
