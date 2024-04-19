import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';
import { MediaTypeComponent } from './media-type/media-type.component';
import { SidebarModule } from '../sidebar.module';
import { CategoryComponent } from './category/category.component';
import { CategoryTypeComponent } from './category-type/category-type.component';
import { OptionsComponent } from './options/options.component';
import { RtoComponent } from './rto/rto.component';
import { VariablesComponent } from './variables/variables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModelTypeComponent } from './model-type/model-type.component';
import { SoundbiteComponent } from './soundbite/soundbite.component';
import { DegreeComponent } from './degree/degree.component';
import { CollectionsComponent } from './collections/collections.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EthnicityComponent } from './ethnicity/ethnicity.component';
import { CountryComponent } from './country/country.component';
import { ReligionComponent } from './religion/religion.component';
import { SexualOrientationComponent } from './sexual-orientation/sexual-orientation.component';
import { RegionalAccentComponent } from './regional-accent/regional-accent.component';
import { IndustryComponent } from './industry/industry.component';
import { PagesComponent } from './pages/pages.component';
import { QuizComponent } from './quiz/quiz.component';
import { FollwersComponent } from './follwers/follwers.component';
import { CommentComponent } from './comment/comment.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

@NgModule({
  declarations: [
    ActionsComponent,
    MediaTypeComponent,
    CategoryComponent,
    CategoryTypeComponent,
    OptionsComponent,
    RtoComponent,
    VariablesComponent,
    ModelTypeComponent,
    SoundbiteComponent,
    DegreeComponent,
    CollectionsComponent,
    EthnicityComponent,
    CountryComponent,
    ReligionComponent,
    SexualOrientationComponent,
    RegionalAccentComponent,
    IndustryComponent,
    PagesComponent,
    QuizComponent,
    FollwersComponent,
    CommentComponent,
    AddVehicleComponent,
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbTooltipModule,
    Ng2SearchPipeModule,
    NgSelectModule,
  ]
})
export class ActionsModule { }
