import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './views/sign-up/sign-up.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserListComponent } from './views/dashboard/users/users-list/users-list.component';
import { UserCreateComponent } from './views/dashboard/users/users-create/users-create.component';
import { ExamCreateComponent } from './views/dashboard/exams/exams-create/exams-create.component';
import { ExamsListComponent } from './views/dashboard/exams/exams-list/exams-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: 'teste', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', component: SignInComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'exams', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', component: ExamsListComponent, pathMatch: 'full' },
      { path: 'new', component: ExamCreateComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'users', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: '', component: UserListComponent, pathMatch: 'full' },
      { path: 'new', component: UserCreateComponent, pathMatch: 'full' }
    ]
  },
  { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full' },
  // redirects...
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
