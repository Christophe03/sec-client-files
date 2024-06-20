import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { ProfilPrefsComponent } from './profil-prefs/profil-prefs.component';
import { ProfilSecuComponent } from './profil-secu/profil-secu.component';
import { ProfilComponent } from './profil.component';

export const routes: Routes = [
  { path: '', component: ProfilComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    SharedModule,
  ],
  declarations: [ProfilComponent, ProfilPrefsComponent, ProfilSecuComponent],
})
export class ProfilModule {}
