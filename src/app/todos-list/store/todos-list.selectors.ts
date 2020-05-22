import {createFeatureSelector, createSelector, select} from "@ngrx/store";

import {AppState} from "../../app.module";
import * as fromTodosList from "./todos-list.reducer";

const selectTodosList = createFeatureSelector<AppState, fromTodosList.State>(fromTodosList.todosListFeatureKey);

export const selectTodos = createSelector(
  selectTodosList,
  (state: fromTodosList.State) => state?.todos
);

export const getTodosList = select(selectTodos);
