import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { MediaTypeComponent } from './media-type/media-type.component';
import { CategoryComponent } from './category/category.component';
import { CategoryTypeComponent } from './category-type/category-type.component';
import { OptionsComponent } from './options/options.component';
import { RtoComponent } from './rto/rto.component';
import { VariablesComponent } from './variables/variables.component';
import { ModelTypeComponent } from './model-type/model-type.component';
import { SoundbiteComponent } from './soundbite/soundbite.component';
import { DegreeComponent } from './degree/degree.component';
import { CollectionsComponent } from './collections/collections.component';

import {CountryComponent} from './country/country.component';
import {ReligionComponent} from './religion/religion.component'
import {RegionalAccentComponent} from './regional-accent/regional-accent.component'
import {SexualOrientationComponent} from './sexual-orientation/sexual-orientation.component'
import {IndustryComponent} from './industry/industry.component'
import {PagesComponent} from './pages/pages.component'
import {QuizComponent} from './quiz/quiz.component'
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';


const routes: Routes = [
  { path: '', component: ActionsComponent },
  { path:'media-type',component:MediaTypeComponent},
  { path:'category',component:CategoryComponent},
  { path:'category-type',component:CategoryTypeComponent},
  { path:'options',component:OptionsComponent},
  { path:'rto',component:RtoComponent},
  { path:'variables',component:VariablesComponent},
  { path:'model-type',component:ModelTypeComponent},
  { path:'soundbite',component:SoundbiteComponent},
  { path:'degree',component:DegreeComponent},
  { path:'collections',component:CollectionsComponent},
  { path:'country',component:CountryComponent},
  { path:'religion',component:ReligionComponent},
  { path:'regional-accent',component:RegionalAccentComponent},
  { path:'sexual-orientation',component:SexualOrientationComponent},
  { path:'industry',component:IndustryComponent},
  { path:'pages',component:PagesComponent},
  { path:'quiz', component:QuizComponent},
  {path:'add-vehicle', component:AddVehicleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
