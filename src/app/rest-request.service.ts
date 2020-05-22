import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {EMPTY} from "rxjs";

import {environment} from "../environments/environment";
import * as fromAuth from "./authentication/store/authentication.reducer";
import {AppState} from "./app.module";
import {TodoModel} from "./models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {
  private usersUrl = null;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    store.select(fromAuth.authenticationFeatureKey).pipe(
      map(store => store && store.user)
    ).subscribe(user => {
      if (user) {
        this.usersUrl = `${environment.firebaseUsersUrl}/${user.userId}.json`;
      }
    });
  }

  addTodo(todos: TodoModel[]) {
    return this.usersUrl ? this.http.put(this.usersUrl, todos) : EMPTY;
  }

  fetchTodos() {
    return this.usersUrl ? this.http.get<TodoModel[]>(this.usersUrl) : EMPTY;
  }
}
