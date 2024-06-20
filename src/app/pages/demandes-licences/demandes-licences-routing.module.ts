import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandesLicencesComponent } from './demandes-licences.component';

const routes: Routes = [
  {
    path: '',
    component: DemandesLicencesComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandesLicencesRoutingModule {}
