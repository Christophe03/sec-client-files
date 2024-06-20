import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesLicencesRoutingModule } from './mes-licences-routing.module';
import { MesLicencesComponent } from './mes-licences.component';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MesLicencesComponent],
  imports: [
    CommonModule,
    MesLicencesRoutingModule,
    SharedModule,
    HttpClientModule,
    NgScrollbarModule,
  ],
})
export class MesLicencesModule {}
