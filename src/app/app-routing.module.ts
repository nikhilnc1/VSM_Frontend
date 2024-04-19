import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
const routes: Routes = [
  { path: '', redirectTo : 'login1', pathMatch : 'full'},
  { path: 'login1', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'dashboard',component:DashboardComponent},
  { path: 'settings',component:SettingComponent}, 
  { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule) },
  { path: 'sidebar', loadChildren: () => import('./shared/sidebar/sidebar.module').then(m => m.SidebarModule) },
  { path: 'admins', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
