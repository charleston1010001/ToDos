import {createAction, props} from '@ngrx/store';
import {UserModel} from "../../models/user.model";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthSuccessProps {
  user: UserModel;
  isSignUp?: boolean;
}

export type IAuthActions<Payload extends {}> = {
  type: string;
} & Payload

export const START_LOGIN = '[authentication] Start Login';
export const START_SIGN_UP = '[authentication] Start Sign Up';
export const AUTHENTICATION_SUCCESS = '[authentication] Authentication Success';
export const LOGOUT = '[authentication] Logout';

export const startLogin = createAction(START_LOGIN, props<Credentials>())
export const startSignUp = createAction(START_SIGN_UP, props<Credentials>())
export const authenticationSuccess = createAction(AUTHENTICATION_SUCCESS, props<AuthSuccessProps>())
export const logout = createAction(LOGOUT)
