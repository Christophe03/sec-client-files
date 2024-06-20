import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetenteursLicencesRoutingModule } from './detenteurs-licences-routing.module';
import { DetenteursLicencesComponent } from './detenteurs-licences.component';
import { JsonParsePipe } from 'src/app/@common/pipes/json-parse.pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DetenteursLicencesComponent, JsonParsePipe],
  imports: [
    CommonModule,
    DetenteursLicencesRoutingModule,
    NgScrollbarModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class DetenteursLicencesModule {}
