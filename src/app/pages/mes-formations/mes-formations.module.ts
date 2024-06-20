import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesFormationsRoutingModule } from './mes-formations-routing.module';
import { MesFormationsComponent } from './mes-formations.component';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MesFormationsComponent],
  imports: [
    CommonModule,
    MesFormationsRoutingModule,
    SharedModule,
    HttpClientModule,
    NgScrollbarModule,
  ],
})
export class MesFormationsModule {}
