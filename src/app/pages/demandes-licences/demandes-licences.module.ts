import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandesLicencesRoutingModule } from './demandes-licences-routing.module';
import { DemandesLicencesComponent } from './demandes-licences.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JsonParsePipe } from 'src/app/@common/pipes/json-parse.pipe';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [DemandesLicencesComponent, JsonParsePipe],
  imports: [
    CommonModule,
    DemandesLicencesRoutingModule,
    SharedModule,
    HttpClientModule,
    NgScrollbarModule,
  ],
})
export class DemandesLicencesModule {}
