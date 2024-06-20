import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { UsersService } from 'src/app/@common/services/users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
})
export class UsersEditComponent {
  @Output() action = new EventEmitter<string>();
  form: FormGroup;
  @Input() item: Users;
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
    protected service: UsersService
  ) {}
  ngOnInit(): void {
    // this.buildForm();
  }

  // protected buildForm(): void {
  //   this.form = this.fb.group({
  //     login: this.fb.control(this.item.login, [Validators.required]),
  //     firstName: this.fb.control(this.item.firstName, [Validators.required]),
  //     lastName: this.fb.control(this.item.lastName, [Validators.required]),
  //     email: this.fb.control(this.item.email, [Validators.required]),
  //     telephone: this.fb.control(this.item.telephone),
  //   });
  //   this.subscribe();
  // }
  // private subscribe(): void {
  //   if (!this.form) {
  //     this.buildForm();
  //   }
  //   this.form
  //     .get('login')
  //     .valueChanges.subscribe((value) => (this.item.login = value));
  //   this.form
  //     .get('firstName')
  //     .valueChanges.subscribe((value) => (this.item.firstName = value));
  //   this.form
  //     .get('lastName')
  //     .valueChanges.subscribe((value) => (this.item.lastName = value));
  //   this.form
  //     .get('email')
  //     .valueChanges.subscribe((value) => (this.item.email = value));
  //   this.form
  //     .get('telephone')
  //     .valueChanges.subscribe((value) => (this.item.phone = value));
  // }
  update() {
    this.item.name =
      this.item.firstname + ' ' + this.item.lastname.toUpperCase();
    this.spinner.show();
    this.service.update(this.item).subscribe(
      (data) => {
        this.item = ConstanteService.getDatas(data);
        this.spinner.hide();
        this.notificationService.openSnackBar(
          'succes',
          'msg.update.item.succes',
          { f: this.translate.instant('utilisateur') },
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
