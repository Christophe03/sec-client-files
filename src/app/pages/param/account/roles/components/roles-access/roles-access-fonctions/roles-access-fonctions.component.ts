import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { Fonctions } from '../../../../users/models/fonctions.model';
import { RolesService } from '../../../roles.service';

@Component({
  selector: 'app-roles-access-fonctions',
  templateUrl: './roles-access-fonctions.component.html',
  styleUrls: ['./roles-access-fonctions.component.scss'],
})
export class RolesAccessFonctionsComponent {
  close: string;
  title = '';
  fonctions: Fonctions[] = [];
  selected = [];
  role: number = 0;
  module: string = '';
  constructor(
    private dialogRef: MatDialogRef<RolesAccessFonctionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected translate: TranslateService,
    protected service: RolesService
  ) {
    this.role = data.role;
    this.module = data.module;
    this.close = this.translate.instant('close');
    this.title = this.translate.instant('fonctionnalites');
  }
  ngOnInit(): void {
    this.service.fonctionToAdd(this.role).subscribe((data) => {
      const l = ConstanteService.getDatas(data);
      console.log(this.module);
      console.log(l);
      this.fonctions = l.filter((f) => f.nature === 'M');
    });
  }

  save() {
    // console.log(this.selected)
    this.dialogRef.close(this.selected);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
