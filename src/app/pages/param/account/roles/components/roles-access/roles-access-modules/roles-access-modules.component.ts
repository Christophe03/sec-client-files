import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { Modules } from '../../../../users/models/modules.model';
import { RolesService } from '../../../roles.service';

@Component({
  selector: 'app-roles-access-modules',
  templateUrl: './roles-access-modules.component.html',
  styleUrls: ['./roles-access-modules.component.scss'],
})
export class RolesAccessModulesComponent {
  close: string;
  title = '';
  modules: Modules[] = [];
  selected = [];
  role: number = 0;
  constructor(
    private dialogRef: MatDialogRef<RolesAccessModulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected translate: TranslateService,
    protected service: RolesService
  ) {
    this.role = data.role;
    this.close = this.translate.instant('close');
    this.title = this.translate.instant('modules');
  }
  ngOnInit(): void {
    this.service.moduleToAdd(this.role).subscribe((data) => {
      this.modules = ConstanteService.getDatas(data);
    });
  }

  save() {
    this.dialogRef.close(this.selected);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
