import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{ path: '',
  children:[
    {path: '',component: AdminsComponent},
    {path: 'role', component: RoleComponent}, 
    {path: 'users', component: UsersComponent}, 
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
