import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './masters.component';
import { CarListComponent } from './cars/car-list/car-list.component'
import { AddEditCarComponent } from './cars/add-edit-car/add-edit-car.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { AddEditBrandComponent } from './brands/add-edit-brand/add-edit-brand.component';
import { ModelListComponent } from './models/model-list/model-list.component';
import { AddEditModelComponent } from './models/add-edit-model/add-edit-model.component';
const routes: Routes = [
  /* { path: '', component: MastersComponent } */
  { path:'',
    children: [
      { path: '', component: MastersComponent },
      { path: 'car-list', component: CarListComponent },
      { path: 'cars', component: AddEditCarComponent },
      { path: 'brand-list', component: BrandListComponent },
      { path: 'brands', component: AddEditBrandComponent },
      { path: 'model-list', component: ModelListComponent },
      { path: 'models', component: AddEditModelComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
