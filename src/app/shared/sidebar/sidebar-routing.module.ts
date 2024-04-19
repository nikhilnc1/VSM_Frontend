import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

const routes: Routes = [
  { path: '', component: SidebarComponent }, 
  { path: 'actions', loadChildren: () => import('./actions/actions.module').then(m => m.ActionsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
