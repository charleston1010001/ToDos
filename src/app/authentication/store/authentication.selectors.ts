import {createFeatureSelector, createSelector, select} from "@ngrx/store";

import {AppState} from "../../app.module";
import * as fromAuth from "./authentication.reducer";

const selectAuth = createFeatureSelector<AppState, fromAuth.State>(fromAuth.authenticationFeatureKey);

export const selectValidUser = createSelector(
  selectAuth,
  (state: fromAuth.State) => {
    return state?.user?.authToken ? state.user : null
  }
);

export const getValidUser = select(selectValidUser);
