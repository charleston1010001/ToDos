import {createFeatureSelector, createSelector, select} from "@ngrx/store";

import {AppState} from "../../app.module";
import * as fromTodosList from "./todos-list.reducer";
import {TodoModel} from "../../models/todo.model";

const selectTodosList = createFeatureSelector<AppState, fromTodosList.State>(fromTodosList.todosListFeatureKey);

export const selectTodos = createSelector(
  selectTodosList,
  (state: fromTodosList.State) => state?.todos.filter((todo: TodoModel) => !todo.isDone)
);

export const getTodosList = select(selectTodos);

export const selectFinishedTodos = createSelector(
  selectTodosList,
  (state: fromTodosList.State) => state?.todos.filter((todo: TodoModel) => todo.isDone)
);

export const getFinishedTodosList = select(selectFinishedTodos);

export const selectSingleTodo = createSelector(
  selectTodosList,
  (state: fromTodosList.State, props) => {
    if (!state?.todos) {
      return null;
    }
    return state.todos.find((todo: TodoModel) => todo.id === props.id);
  }
);

export const getSingleTodo = (id: string) => select(selectSingleTodo, {id})
