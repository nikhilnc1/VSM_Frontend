import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ServiceDoneListComponent } from './service-done-list/service-done-list.component';
import { UnderServiceListComponent } from './under-service-list/under-service-list.component';


@NgModule({
  declarations: [
    SidebarComponent,
    ScheduleListComponent,
    ServiceDoneListComponent,
    UnderServiceListComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
