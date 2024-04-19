import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {  NgbModule,NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgSelectModule } from '@ng-select/ng-select/public-api';;

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpConfigInterceptor } from './shared/interceptors/http-config.interceptor';
import { AdminsModule } from './admins/admins.module';
import { SettingComponent } from './setting/setting.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    AdminsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NgbModule,NgbTooltipModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
