import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import * as todosListActions from './todos-list.actions';
import {TodoModel} from "../../models/todo.model";
import {FetchTodosProps} from "./todos-list.actions";

export interface State {
  todos: TodoModel[]
}

export const initialState: State = {
  todos: []
}

export const todosListFeatureKey = 'todos';

const todosListReducer = createReducer(
  initialState,
  on(todosListActions.fetchTodosSuccess, (state: State, action: FetchTodosProps) => {
    return {
      ...state,
      todos: [...action.todos]
    }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return todosListReducer(state, action);
}
