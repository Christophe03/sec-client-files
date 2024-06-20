import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesDemandesdeLicencesRoutingModule } from './mes-demandesde-licences-routing.module';
import { MesDemandesdeLicencesComponent } from './mes-demandesde-licences.component';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MesDemandesdeLicencesComponent],
  imports: [
    CommonModule,
    MesDemandesdeLicencesRoutingModule,
    SharedModule,
    HttpClientModule,
    NgScrollbarModule,
  ],
})
export class MesDemandesdeLicencesModule {}
