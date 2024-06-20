import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesLicencesComponent } from './mes-licences.component';

const routes: Routes = [
  {
    path: '',
    component: MesLicencesComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesLicencesRoutingModule {}
