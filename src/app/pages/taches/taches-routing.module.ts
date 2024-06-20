import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TachesListComponent } from './taches-list/taches-list.component';

const routes: Routes = [
  {
    path: '',
    // data: { breadcrumb: 'Taches' },
    component: TachesListComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TachesRoutingModule {}
