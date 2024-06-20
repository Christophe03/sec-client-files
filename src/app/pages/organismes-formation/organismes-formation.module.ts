import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismesFormationRoutingModule } from './organismes-formation-routing.module';
import { OrganismesFormationComponent } from './organismes-formation.component';
import { JsonParsePipe } from 'src/app/@common/pipes/json-parse.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OrganismesFormationComponent, JsonParsePipe],
  imports: [
    CommonModule,
    OrganismesFormationRoutingModule,
    NgScrollbarModule,
    SharedModule,
    HttpClientModule,
  ],
})
export class OrganismesFormationModule {}
