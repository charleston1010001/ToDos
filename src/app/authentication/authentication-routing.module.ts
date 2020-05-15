import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticationFormComponent} from "./authentication-form/authentication-form.component";


const routes: Routes = [
  { path: '', component: AuthenticationFormComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
// @ts-ignore
export class AuthenticationRoutingModule { }
