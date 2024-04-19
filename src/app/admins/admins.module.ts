import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';
import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { UsersComponent } from './users/users.component';
import { RoleComponent } from './role/role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AdminsComponent,
    UsersComponent,
    RoleComponent,
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbTooltipModule, 
    Ng2SearchPipeModule,
  ]
})
export class AdminsModule { }
