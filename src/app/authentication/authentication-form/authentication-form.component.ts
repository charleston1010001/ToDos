import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {ErrorStateMatcher} from "@angular/material/core";

import {AppState} from "../../app.module";
import * as AuthenticationActions from '../store/authentication.actions';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent {
  isLoginMode = true;
  isFormSubmitted = false;
  matcher = new CustomErrorStateMatcher();
  authenticationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  get email() {
    return this.authenticationForm.get('email');
  }

  get password() {
    return this.authenticationForm.get('password');
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.authenticationForm.valid) {
      const form = this.authenticationForm.value;
      const dispatchMethod = this.isLoginMode ? AuthenticationActions.startLogin : AuthenticationActions.startSignUp;
      this.store.dispatch(dispatchMethod({email: form.email, password: form.password}));
      this.onClear();
    }
  }

  onClear() {
    this.isFormSubmitted = false;
    this.authenticationForm.reset();
  }
}
