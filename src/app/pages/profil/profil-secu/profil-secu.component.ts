import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/@common/models/users';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { UsersService } from 'src/app/@common/services/users.service';
import { PasswordValidation } from 'src/app/@common/validator/password.validator';

@Component({
  selector: 'app-profil-secu',

  templateUrl: './profil-secu.component.html',
  styleUrl: './profil-secu.component.scss',
})
export class ProfilSecuComponent {
  form: FormGroup;
  item: Users;
  pipe = new DatePipe('en-US');
  index: number = 0;
  apwd: string;
  cpwd: string;
  constructor(
    protected translate: TranslateService,
    protected service: UsersService,
    protected loginService: LoginService,
    protected localStorageService: LocalStorageService,
    protected fb: FormBuilder,
    private spinner: NgxSpinnerService,
    protected notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.item = new Users();
    this.loginService.account.subscribe((data) => {
      this.item = data;
    });
    //this.buildForm();
  }

  protected buildForm(): void {
    this.form = this.fb.group(
      {
        apwd: this.fb.control('admin', [Validators.required]),
        npwd: this.fb.control('', [Validators.required]),
        cpwd: this.fb.control('', [Validators.required]),
      },
      {
        validator: PasswordValidation.MatchPassword,
      }
    );
    this.subscribe();
  }
  private subscribe(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form
      .get('apwd')
      .valueChanges.subscribe((value) => (this.apwd = value));
    this.form
      .get('cpwd')
      .valueChanges.subscribe((value) => (this.cpwd = value));
  }
  updatePassword() {
    // this.service.updatePassword(this.item).subscribe(
    //   (data) => {
    //     this.item = ConstanteService.getDatas(data);
    //     this.spinner.hide();
    //     this.notificationService.openSnackBar(
    //       'succes',
    //       'update.password.succes',
    //       { f: this.translate.instant('preferences') },
    //       ''
    //     );
    //   },
    //   (error) => {
    //     this.showError(error);
    //   }
    // );
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
