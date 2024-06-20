import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationsPersonnelComponent } from './formations-personnel.component';

const routes: Routes = [
  {
    path: '',
    component: FormationsPersonnelComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormationsPersonnelRoutingModule {}
