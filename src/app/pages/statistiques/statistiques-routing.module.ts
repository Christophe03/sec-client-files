import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatistiquesComponent } from './statistiques.component';

const routes: Routes = [
  {
    path: '',
    // data: { breadcrumb: 'tache' },
    component: StatistiquesComponent,
    // resolve: { data: SocieteResolver },
    children: [],
  },
  // {
  //   path: ':id',
  //   data: { breadcrumb: 'Détail', backLink: 'misBack' },
  //   component: SocietesEditComponent,
  //   resolve: { data: SocieteResolver },
  //   children: [],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatistiquesRoutingModule {}
