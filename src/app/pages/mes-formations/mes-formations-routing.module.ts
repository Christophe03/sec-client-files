import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesFormationsComponent } from './mes-formations.component';

const routes: Routes = [
  {
    path: '',
    component: MesFormationsComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesFormationsRoutingModule {}
