import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {StoreModule} from "@ngrx/store";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import * as fromAuthentication from './authentication/store/authentication.reducer';
import {authenticationFeatureKey} from "./authentication/store/authentication.reducer";

export interface AppState {
  [authenticationFeatureKey]: fromAuthentication.State
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
