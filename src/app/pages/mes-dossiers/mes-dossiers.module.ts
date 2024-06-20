import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesDossiersRoutingModule } from './mes-dossiers-routing.module';
import { MesDossiersListComponent } from './mes-dossiers-list/mes-dossiers-list.component';
import { MesDossiersEditComponent } from './mes-dossiers-edit/mes-dossiers-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocieteRepertoireComponent } from './societe-repertoire/societe-repertoire.component';
import { DeposerDialogComponent } from './deposer-dialog/deposer-dialog.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JsonParsePipe } from 'src/app/@common/pipes/json-parse.pipe';
import { MillisecondeToDatePipe } from 'src/app/@common/pipes/milliseconde-to-date.pipe';
import { NewDossierDialogComponent } from './new-dossier-dialog/new-dossier-dialog.component';

@NgModule({
  declarations: [
    MesDossiersListComponent,
    MesDossiersEditComponent,
    SocieteRepertoireComponent,
    DeposerDialogComponent,
    NewDossierDialogComponent,
    JsonParsePipe,
    MillisecondeToDatePipe,
  ],
  imports: [
    CommonModule,
    MesDossiersRoutingModule,
    SharedModule,
    NgScrollbarModule,
  ],
})
export class MesDossiersModule {}
