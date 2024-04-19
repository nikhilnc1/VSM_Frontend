import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { CarListComponent } from './cars/car-list/car-list.component';
import { AddEditCarComponent } from './cars/add-edit-car/add-edit-car.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { AddEditBrandComponent } from './brands/add-edit-brand/add-edit-brand.component';
import { ModelListComponent } from './models/model-list/model-list.component';
import { AddEditModelComponent } from './models/add-edit-model/add-edit-model.component'; 

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    MastersComponent,
    CarListComponent,
    AddEditCarComponent,
    BrandListComponent,
    AddEditBrandComponent,
    ModelListComponent,
    AddEditModelComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    SidebarModule,
    FormsModule,ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbTooltipModule
  ]
})
export class MastersModule { }
