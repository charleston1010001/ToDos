import {createAction, props} from '@ngrx/store';
import {TodoModel} from "../../models/todo.model";

export type ITodosListActions<Payload extends {}> = {
  type: string;
} & Payload

export interface AddTodoProps {
  todo: TodoModel
}

export interface FetchTodosProps {
  todos: TodoModel[]
}

export const ADD_TODO = '[todos-list] Add Todo';
export const START_FETCH_TODOS = '[todos-list] Start Fetch Todos';
export const FETCH_TODOS_SUCCESS = '[todos-list] Fetch Todos Success';

export const addTodo = createAction(ADD_TODO, props<AddTodoProps>());
export const startFetchTodos = createAction(START_FETCH_TODOS);
export const fetchTodosSuccess = createAction(FETCH_TODOS_SUCCESS, props<FetchTodosProps>());
