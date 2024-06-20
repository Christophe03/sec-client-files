import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocietesRoutingModule } from './societes-routing.module';
import { SocietesAddComponent } from './societes-add/societes-add.component';
import { SocietesEditComponent } from './societes-edit/societes-edit.component';
import { SocietesListComponent } from './societes-list/societes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SocietesAddComponent,
    SocietesEditComponent,
    SocietesListComponent,
  ],
  imports: [CommonModule, SocietesRoutingModule, SharedModule],
})
export class SocietesModule {}
