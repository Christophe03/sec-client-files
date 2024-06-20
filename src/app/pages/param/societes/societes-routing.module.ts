import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocietesListComponent } from './societes-list/societes-list.component';
import { SocietesEditComponent } from './societes-edit/societes-edit.component';
import { SocieteResolver } from 'src/app/@common/resolvers/societe.resolver';

const routes: Routes = [
  {
    path: '',
    // data: { breadcrumb: 'tache' },
    component: SocietesListComponent,
    resolve: { data: SocieteResolver },
    children: [],
  },
  {
    path: ':id',
    data: { breadcrumb: 'Détail', backLink: 'misBack' },
    component: SocietesEditComponent,
    resolve: { data: SocieteResolver },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietesRoutingModule {}
