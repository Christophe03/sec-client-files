import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesDemandesdeLicencesComponent } from './mes-demandesde-licences.component';

const routes: Routes = [
  {
    path: '',
    component: MesDemandesdeLicencesComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesDemandesdeLicencesRoutingModule {}
