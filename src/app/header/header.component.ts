import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {AppState} from "../app.module";
import {UserModel} from "../models/user.model";
import {getValidUser} from "../authentication/store/authentication.selectors";
import * as AuthenticationActions from '../authentication/store/authentication.actions';
import * as fromAuth from '../authentication/store/authentication.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser: UserModel = null;
  private storeSub = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((state: fromAuth.State) => {
      this.currentUser = state?.user;
    })
  }

  ngOnDestroy() {
    this.storeSub && this.storeSub.unsubscribe();
  }

  get isUserValid() {
    return !!this.currentUser?.authToken
  }

  logout() {
    this.store.dispatch(AuthenticationActions.logout());
  }
}
