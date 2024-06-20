import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesDossiersListComponent } from './mes-dossiers-list/mes-dossiers-list.component';
import { MesDossiersEditComponent } from './mes-dossiers-edit/mes-dossiers-edit.component';
import { SocieteResolver } from 'src/app/@common/resolvers/societe.resolver';

const routes: Routes = [
  {
    path: '',
    // data: { breadcrumb: 'tache' },
    component: MesDossiersListComponent,
    // resolve: { data: SocieteResolver },
    children: [],
  },
  {
    path: ':id',
    data: { breadcrumb: 'Détail', backLink: 'misBack' },
    component: MesDossiersEditComponent,
    resolve: { data: SocieteResolver },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesDossiersRoutingModule {}
