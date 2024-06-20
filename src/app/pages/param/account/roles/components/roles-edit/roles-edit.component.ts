import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss'],
})
export class RolesEditComponent {
  @Output() action = new EventEmitter<string>();
  form: FormGroup;
  @Input() item: Roles;
  pipe = new DatePipe('en-US');
  index: number = 0;
  constructor(
    protected translate: TranslateService,
    private spinner: NgxSpinnerService,
    protected localStorageService: LocalStorageService,
    private router: Router,
    protected fb: FormBuilder,
    private dialog: MatDialog,
    protected notificationService: NotificationService,
    protected commonService: CommonService,
    protected service: RolesService
  ) {}
  ngOnInit(): void {
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
  update() {
    this.spinner.show();
    this.service.update(this.item.id, this.item).subscribe(
      (data) => {
        this.item = ConstanteService.getDatas(data);
        this.spinner.hide();
        this.notificationService.openSnackBar(
          'succes',
          'msg.update.item.succes',
          { f: this.translate.instant('role') },
          ''
        );
        this.action.emit('list');
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  cancel() {
    this.action.emit('list');
  }
  onTabChange(event: MatTabChangeEvent) {
    this.index = event.index;
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
