import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'dashboard', component:DashboardComponent}
];
