import {createAction, props} from '@ngrx/store';
import {TodoModel} from "../../models/todo.model";

export type ITodosListActions<Payload extends {}> = {
  type: string;
} & Payload

export interface AddTodoProps {
  todo: TodoModel,
  skipNavigation?: boolean
}

export interface FetchTodosProps {
  todos: TodoModel[]
}

export interface addTodoSuccessProps {
  isUpdate: boolean,
  skipNavigation: boolean
}

export const ADD_TODO = '[todos-list] Add Todo';
export const UPDATE_TODO = '[todos-list] Update Todo';
export const ADD_TODO_SUCCESS = '[todos-list] Add Todo Success';
export const START_FETCH_TODOS = '[todos-list] Start Fetch Todos';
export const FETCH_TODOS_SUCCESS = '[todos-list] Fetch Todos Success';

export const updateTodo = createAction(UPDATE_TODO, props<AddTodoProps>());
export const addTodo = createAction(ADD_TODO, props<AddTodoProps>());
export const addTodoSuccess = createAction(ADD_TODO_SUCCESS, props<addTodoSuccessProps>());
export const startFetchTodos = createAction(START_FETCH_TODOS);
export const fetchTodosSuccess = createAction(FETCH_TODOS_SUCCESS, props<FetchTodosProps>());
