import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './pages/errors/error/error.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: PagesComponent,
    children: [
      // { path: 'error', component: ErrorComponent },

      {
        path: 'profil',
        loadChildren: () =>
          import('./pages/profil/profil.module').then((m) => m.ProfilModule),
        data: { breadcrumb: 'preferences' },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: {
          breadcrumb: 'Tableau de bord',

          preload: true,
          delay: 10000,
        },
      },

      {
        path: 'parametres',
        loadChildren: () =>
          import('./pages/param/param.module').then((m) => m.ParamModule),
        data: {
          breadcrumb: 'Paramètres',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'demandes',
        loadChildren: () =>
          import('./pages/demandes-licences/demandes-licences.module').then(
            (m) => m.DemandesLicencesModule
          ),
        data: {
          breadcrumb: 'Demandes',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'détenteurs',
        loadChildren: () =>
          import('./pages/detenteurs-licences/detenteurs-licences.module').then(
            (m) => m.DetenteursLicencesModule
          ),
        data: {
          breadcrumb: 'Détenteurs',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'organismes',
        loadChildren: () =>
          import(
            './pages/organismes-formation/organismes-formation.module'
          ).then((m) => m.OrganismesFormationModule),
        data: {
          breadcrumb: 'Organismes',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'verification/licence',
        loadChildren: () =>
          import(
            './pages/verification-licences/verification-licence.module'
          ).then((m) => m.VerificationLicenceModule),
        data: {
          breadcrumb: 'Verifier une Licence',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'verification/historique',
        loadChildren: () =>
          import(
            './pages/verification-licences/historique-licence/historique-licence.module'
          ).then((m) => m.HistoriqueLicenceModule),
        data: {
          breadcrumb: 'Historique de vérification',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'formations/historique',
        loadChildren: () =>
          import(
            './pages/formations-personnel/formations-personnel.module'
          ).then((m) => m.FormationsPersonnelModule),
        data: {
          breadcrumb: 'Historique formation',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'formations/rappels',
        loadChildren: () =>
          import('./pages/formations-personnel/rappels/rappels.module').then(
            (m) => m.RappelsModule
          ),
        data: {
          breadcrumb: 'Rappels',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'formations/plan',
        loadChildren: () =>
          import(
            './pages/formations-personnel/plan-formation/plan-formation.module'
          ).then((m) => m.PlanFormationModule),
        data: {
          breadcrumb: 'Plan de Formation',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'rapports',
        loadChildren: () =>
          import('./pages/rapports/rapports.module').then(
            (m) => m.RapportsModule
          ),
        data: {
          breadcrumb: 'Rapports',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'parametres/configurations',
        loadChildren: () =>
          import('./pages/param/configurations/configurations.module').then(
            (m) => m.ConfigurationsModule
          ),
        data: {
          breadcrumb: 'Configuration',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'mesdemandes',
        loadChildren: () =>
          import(
            './pages/mes-demandesde-licences/mes-demandesde-licences.module'
          ).then((m) => m.MesDemandesdeLicencesModule),
        data: {
          breadcrumb: 'Mes Demandes de Licences',
          preload: true,
          delay: 10000,
        },
      },

      {
        path: 'meslicences',
        loadChildren: () =>
          import('./pages/mes-licences/mes-licences.module').then(
            (m) => m.MesLicencesModule
          ),
        data: {
          breadcrumb: 'Mes licences',
          preload: true,
          delay: 10000,
        },
      },
      {
        path: 'mesFormation',
        loadChildren: () =>
          import('./pages/mes-formations/mes-formations.module').then(
            (m) => m.MesFormationsModule
          ),
        data: {
          breadcrumb: 'Mes Formation',
          preload: true,
          delay: 10000,
        },
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },

  { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
