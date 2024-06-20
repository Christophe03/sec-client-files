import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent {
  form: FormGroup;
  item: Users;
  pipe = new DatePipe('en-US');
  close: string;
  title = '';
  users: Users[] = [];
  constructor(
    private dialogRef: MatDialogRef<UsersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected translate: TranslateService,
    private spinner: NgxSpinnerService,
    protected localStorageService: LocalStorageService,
    protected fb: FormBuilder,
    protected notificationService: NotificationService,
    protected commonService: CommonService
  ) {
    this.users = data.users;
    this.close = this.translate.instant('close');
    this.title =
      this.translate.instant('nouveau') +
      ' ' +
      this.translate.instant('utilisateur').toLowerCase();
  }
  // ngOnInit(): void {
  //   this.item = new Users();
  //   this.item.nature = 'U';
  //   this.item.login = 'test';
  //   this.item.firstName = 'test';
  //   this.item.lastName = 'test';
  //   this.item.email = 'test@test.com';
  //   this.buildForm();
  // }

  // protected buildForm(): void {
  //   this.form = this.fb.group({
  //     login: this.fb.control(this.item.login, [Validators.required]),
  //     firstName: this.fb.control(this.item.firstName, [Validators.required]),
  //     lastName: this.fb.control(this.item.lastName, [Validators.required]),
  //     email: this.fb.control(this.item.email, [
  //       Validators.required,
  //       emailValidator,
  //       // this.findDuplicateEmail(),
  //     ]),
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
  //     .valueChanges.subscribe((value) => (this.item.telephone = value));
  // }
  // findDuplicateEmail(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     if (
  //       control.value !== undefined &&
  //       isNaN(control.value) &&
  //       this.users
  //         .filter((x) => x.id != this.item.id)
  //         .some(
  //           (e) =>
  //             e.email != null &&
  //             e.email.trim().toLocaleLowerCase() ===
  //               control.value.trim().toLocaleLowerCase()
  //         )
  //     ) {
  //       return { findDuplicateEmail: true };
  //     }
  //     return null;
  //   };
  // }
  save() {
    // this.item.name =
    //   this.item.firstName + ' ' + this.item.lastName.toUpperCase();
    // this.dialogRef.close(this.item);
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
