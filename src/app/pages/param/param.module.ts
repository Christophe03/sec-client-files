import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account/account.component';
import { HistoComponent } from './account/histo/histo.component';
import { RolesAccessFonctionsComponent } from './account/roles/components/roles-access/roles-access-fonctions/roles-access-fonctions.component';
import { RolesAccessModulesComponent } from './account/roles/components/roles-access/roles-access-modules/roles-access-modules.component';
import { RolesAccessComponent } from './account/roles/components/roles-access/roles-access.component';
import { RolesAddComponent } from './account/roles/components/roles-add/roles-add.component';
import { RolesEditComponent } from './account/roles/components/roles-edit/roles-edit.component';
import { RolesComponent } from './account/roles/roles.component';
// import { UsersAccessFonctionsEditComponent } from './account/users/components/users-access/users-access-fonctions-edit/users-access-fonctions-edit.component';
// import { UsersAccessFonctionsComponent } from './account/users/components/users-access/users-access-fonctions/users-access-fonctions.component';
// import { UsersAccessModulesComponent } from './account/users/components/users-access/users-access-modules/users-access-modules.component';
// import { UsersAccessRolesComponent } from './account/users/components/users-access/users-access-roles/users-access-roles.component';
// import { UsersAccessComponent } from './account/users/components/users-access/users-access.component';
import { UsersAddComponent } from './account/users/components/users-add/users-add.component';
// import { UsersDosAddComponent } from './account/users/components/users-dos/users-dos-add/users-dos-add.component';
// import { UsersDosComponent } from './account/users/components/users-dos/users-dos.component';
import { UsersEditComponent } from './account/users/components/users-edit/users-edit.component';
import { UsersComponent } from './account/users/users.component';
// import { ConstantesComponent } from './constantes/constantes.component';

// import { ConventionsComponent } from './structures/components/conventions/conventions.component';
// import { DepartementsComponent } from './structures/components/departements/departements.component';
// import { SocietesComponent } from './structures/components/societes/societes.component';
// import { StructuresComponent } from './structures/structures.component';
import { DossiersComponent } from './dossiers/dossiers.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'utilisateurs',
    pathMatch: 'full',
  },
  {
    path: 'utilisateurs',
    data: { breadcrumb: 'Utilisateurs' },
    component: AccountComponent,
    children: [],
  },

  {
    path: 'repertoires',
    data: { breadcrumb: 'Répertoires' },
    component: DossiersComponent,
    children: [],
  },
  {
    path: 'societes',
    loadChildren: () =>
      import('./societes/societes.module').then((m) => m.SocietesModule),
    data: { breadcrumb: 'Sociétés' },
  },

  // {
  //   path: 'constantes',
  //   data: { breadcrumb: 'menu.constantes' },
  //   component: ConstantesComponent,
  //   children: [],
  // },
  // {
  //   path: 'structures',
  //   data: { breadcrumb: 'menu.structures' },
  //   children: [
  //     {
  //       path: '',
  //       data: { breadcrumb: 'menu.structures' },
  //       component: StructuresComponent,
  //     },
  //     {
  //       path: 'societe',
  //       data: { breadcrumb: 'menu.societe', backLink: 'structures' },
  //       component: SocietesComponent,
  //     },
  //     {
  //       path: 'depsrv',
  //       data: { breadcrumb: 'menu.depsrv', backLink: 'structures' },
  //       component: DepartementsComponent,
  //     },
  //     {
  //       path: 'conventions',
  //       data: { breadcrumb: 'menu.conventions', backLink: 'structures' },
  //       component: ConventionsComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  declarations: [
    DossiersComponent,
    AccountComponent,
    UsersComponent,
    UsersAddComponent,
    UsersEditComponent,
    // UsersAccessComponent,
    // UsersAccessFonctionsEditComponent,
    // UsersAccessModulesComponent,
    // UsersAccessFonctionsComponent,
    // UsersAccessRolesComponent,
    // UsersDosComponent,
    // UsersDosAddComponent,
    RolesComponent,
    RolesAddComponent,
    RolesEditComponent,
    RolesAccessComponent,
    RolesAccessFonctionsComponent,
    RolesAccessModulesComponent,
    HistoComponent,
    // ConstantesComponent,
    // StructuresComponent,
    // SocietesComponent,
    // DepartementsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
})
export class ParamModule {}
