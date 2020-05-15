import { Action, createReducer, on } from '@ngrx/store';
import * as authenticationActions from './authentication.actions';
import {UserModel} from "../../models/user.model";

export interface State {
  user: UserModel
}

export const initialState: State = {
  user: null
}

export const authenticationFeattureKey = 'auth';

const authenticationReducer = createReducer(
  initialState,
  on(authenticationActions.setUser, (state: State, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(authenticationActions.removeUser, (state: State) => {
    return {
      ...state,
      user: null
    }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return authenticationReducer(state, action);
}
