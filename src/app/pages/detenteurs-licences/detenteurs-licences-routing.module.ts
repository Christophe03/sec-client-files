import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetenteursLicencesComponent } from './detenteurs-licences.component';

const routes: Routes = [
  {
    path: '',
    component: DetenteursLicencesComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetenteursLicencesRoutingModule {}
