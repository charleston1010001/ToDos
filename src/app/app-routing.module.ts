import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', canLoad: [AuthGuard], loadChildren: () => import('./todos-list/todos-list.module').then(m => m.TodosListModule) },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
