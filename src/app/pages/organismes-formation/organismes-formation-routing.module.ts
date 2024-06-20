import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganismesFormationComponent } from './organismes-formation.component';

const routes: Routes = [
  {
    path: '',
    component: OrganismesFormationComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganismesFormationRoutingModule {}
