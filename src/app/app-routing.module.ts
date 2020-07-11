import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppcontainerComponent } from './appcontainer/appcontainer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "app", component: AppcontainerComponent, canActivate: [AuthGuard] },
  { path: "account/:userId", component: SignupComponent, canActivate: [AuthGuard] },
  { path: "resetpass/:user", component: SignupComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
