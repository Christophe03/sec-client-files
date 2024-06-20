import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/@common/services/common.service';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { NotificationService } from 'src/app/@common/services/notification.service';

import { Roles } from '../../models/roles.model';
import { RolesService } from '../../roles.service';

@Component({
  selector: 'app-roles-add',
  templateUrl: './roles-add.component.html',
  styleUrls: ['./roles-add.component.scss'],
})
export class RolesAddComponent {
  form: FormGroup;
  item: Roles;
  pipe = new DatePipe('en-US');
  close: string;
  title = '';
  constructor(
    private dialogRef: MatDialogRef<RolesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected translate: TranslateService,
    private spinner: NgxSpinnerService,
    protected localStorageService: LocalStorageService,
    private router: Router,
    protected fb: FormBuilder,
    protected service: RolesService,
    private dialog: MatDialog,
    protected notificationService: NotificationService,
    protected commonService: CommonService
  ) {
    // this.projet = data.projet;
    this.close = this.translate.instant('close');
    this.title =
      this.translate.instant('nouveau') +
      ' ' +
      this.translate.instant('role').toLowerCase();
  }
  ngOnInit(): void {
    this.item = new Roles();
    this.item.nature = 'U';
    this.buildForm();
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      nom: this.fb.control(this.item.nom, [Validators.required]),
    });
    this.subscribe();
  }
  private subscribe(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form
      .get('nom')
      .valueChanges.subscribe((value) => (this.item.nom = value));
  }
  save() {
    this.dialogRef.close(this.item);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  showError(error): void {
    this.spinner.hide();
    this.notificationService.openSnackBar(
      'error',
      'oups.erreur.survenue',
      { f: ConstanteService.getErrorMessage(error) },
      ''
    );
  }
}
