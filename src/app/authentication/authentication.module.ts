import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AuthenticationFormComponent } from './authentication-form/authentication-form.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import * as fromAuth from './store/authentication.reducer';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [AuthenticationFormComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature(fromAuth.authenticationFeattureKey, fromAuth.reducer)
  ]
})
export class AuthenticationModule { }
