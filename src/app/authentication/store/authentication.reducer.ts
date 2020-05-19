import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import * as authenticationActions from './authentication.actions';
import {UserModel} from "../../models/user.model";
import {AppState} from "../../app.module";

export interface State {
  user: UserModel
}

export const initialState: State = {
  user: null
}

export const authenticationFeatureKey = 'auth';

const authenticationReducer = createReducer(
  initialState,
  on(authenticationActions.authenticationSuccess, (state: State, action: State) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(authenticationActions.logout, (state: State) => {
    return {
      ...state,
      user: null
    }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return authenticationReducer(state, action);
}
