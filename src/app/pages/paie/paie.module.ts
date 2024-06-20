import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CatechComponent } from './catech/catech.component';
import { PlanpaieComponent } from './planpaie/planpaie.component';

export const routes: Routes = [
  {
    path: 'planpaie',
    data: { breadcrumb: 'menu.planpaie' },
    component: PlanpaieComponent,
    children: [],
  },
  {
    path: 'catech',
    data: { breadcrumb: 'menu.catech' },
    component: CatechComponent,
    children: [],
  },
];

@NgModule({
  declarations: [PlanpaieComponent, CatechComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
})
export class PaieModule {}
