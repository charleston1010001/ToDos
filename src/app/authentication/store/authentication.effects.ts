import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError} from "rxjs/operators";
import {Router} from "@angular/router";

import * as AuthenticationActions from './authentication.actions'
import {AuthenticationService, AuthResponseData} from "../authentication.service";
import {UserModel} from "../../models/user.model";
import {NotificationsService} from "../../notifications.service";
import {EMPTY} from "rxjs";

@Injectable()
// @ts-ignore
export class AuthenticationEffects {
  constructor(private actions$: Actions, private authService: AuthenticationService, private notifications: NotificationsService, private router: Router) {
  }

  handleAuthentication(response: AuthResponseData) {
    const {expiresIn, email, idToken, localId} = response;
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, localId, idToken, expirationDate);
    return AuthenticationActions.authenticationSuccess({
      user,
      isSignUp: true
    });
  }

  handleErrors(errorResponse: any) {
    let errorMessage = 'Unknown error...';
    if (!errorResponse.error || !errorResponse.error.error) {
      this.notifications.showNotification(errorMessage);
      return EMPTY;
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'E-Mail address already exists...';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'E-Mail address not found...';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password...';
        break;
    }
    this.notifications.showNotification(errorMessage);
    return EMPTY;
  };

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.START_SIGN_UP),
    switchMap((action: AuthenticationActions.IAuthActions<AuthenticationActions.Credentials>) => {
      return this.authService.signUp(action.email, action.password).pipe(
        map((response: AuthResponseData) => this.handleAuthentication(response)),
        catchError(errorResponse => this.handleErrors(errorResponse))
      );
    })
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.START_LOGIN),
    switchMap((action: AuthenticationActions.IAuthActions<AuthenticationActions.Credentials>) => {
      return this.authService.login(action.email, action.password).pipe(
        map((response: AuthResponseData) => this.handleAuthentication(response)),
        catchError(errorResponse => this.handleErrors(errorResponse))
      );
    })
  ));

  authSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.AUTHENTICATION_SUCCESS),
    switchMap((action: AuthenticationActions.IAuthActions<AuthenticationActions.AuthSuccessProps>) => {
      const message = action.isSignUp ? 'Sign up successful. You are now logged in.' : 'Login successful!';
      this.notifications.showNotification(message);
      this.router.navigate(['/list']);
      return EMPTY;
    }),
  ), {dispatch: false})

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationActions.LOGOUT),
    switchMap(() => {
      if (window.location.href.indexOf('auth') === -1) {
        this.router.navigate(['/auth']);
      }
      return EMPTY;
    })
  ));
}
