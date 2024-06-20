import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationsPersonnelRoutingModule } from './formations-personnel-routing.module';
import { FormationsPersonnelComponent } from './formations-personnel.component';

@NgModule({
  declarations: [FormationsPersonnelComponent],
  imports: [CommonModule, FormationsPersonnelRoutingModule],
})
export class FormationsPersonnelModule {}
