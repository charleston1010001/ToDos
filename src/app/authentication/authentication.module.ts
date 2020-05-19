import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {EffectsModule} from "@ngrx/effects";

import { AuthenticationFormComponent } from './authentication-form/authentication-form.component';
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import * as fromAuth from './store/authentication.reducer';
import {AuthenticationEffects} from "./store/authentication.effects";



@NgModule({
  declarations: [AuthenticationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature(fromAuth.authenticationFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthenticationEffects])
  ]
})
export class AuthenticationModule { }
