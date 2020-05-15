import {createAction, props} from '@ngrx/store';
import {UserModel} from "../../models/user.model";

export const startLogin = createAction('[authentication] Start Login', props<{ userName: string, password: string }>())
export const startSignUp = createAction('[authentication] Start Sign Up', props<{ userName: string, password: string }>())
export const setUser = createAction('[authentication] Set User', props<{ user: UserModel }>())
export const removeUser = createAction('[authentication] Remove User')
