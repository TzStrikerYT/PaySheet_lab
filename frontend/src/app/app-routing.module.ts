import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/register/register.component';
import { UserGuard } from './user.guard';
import { AdminGuard } from './admin.guard';
import { NominasComponent } from './components/nominas/nominas.component';
import { UserViewComponent } from './components/user-view/user-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'client', component: ClientComponent, canActivate: [UserGuard] },

  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AdminGuard] },
  { path: 'register/:id', component: RegisterComponent, canActivate: [AdminGuard] },
  { path: 'nominas', component: NominasComponent, canActivate: [AdminGuard] },
  { path: 'user/:id', component: UserViewComponent, canActivate: [AdminGuard] },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
