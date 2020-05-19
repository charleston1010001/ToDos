import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import {map, take} from "rxjs/operators";

import {AppState} from "./app.module";
import * as fromAuth from './authentication/store/authentication.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private store: Store<AppState>, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map((auth: fromAuth.State) => {
        if (!!auth?.user?.authToken) {
          return true;
        } else {
          this.router.navigate(['/auth'])
          return false;
        }
      })
    )
  }
}
