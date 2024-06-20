import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TachesRoutingModule } from './taches-routing.module';
import { TachesListComponent } from './taches-list/taches-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JsonParsePipe } from 'src/app/@common/pipes/json-parse.pipe';
import { MillisecondeToDatePipe } from 'src/app/@common/pipes/milliseconde-to-date.pipe';

@NgModule({
  declarations: [TachesListComponent, JsonParsePipe, MillisecondeToDatePipe],
  imports: [CommonModule, TachesRoutingModule, SharedModule],
})
export class TachesModule {}
