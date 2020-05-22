import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {AppState} from "../app.module";
import * as fromAuth from './store/authentication.reducer';
import {UserModel} from "../models/user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(fromAuth.authenticationFeatureKey).pipe(
      take(1),
      map((authState: fromAuth.State) => {
        return authState.user;
      }),
      exhaustMap((user: UserModel) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.authToken)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
