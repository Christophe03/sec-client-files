import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { UsersService } from 'src/app/@common/services/users.service';

@Component({
  selector: 'app-profil-prefs',

  templateUrl: './profil-prefs.component.html',
  styleUrl: './profil-prefs.component.scss',
})
export class ProfilPrefsComponent {
  form: FormGroup;
  item: Users;
  pipe = new DatePipe('en-US');
  index: number = 0;
  langues: any[] = [];
  lang: any;
  constructor(
    protected translate: TranslateService,
    protected service: UsersService,
    protected commonService: CommonService,
    protected loginService: LoginService,
    protected fb: FormBuilder,
    private spinner: NgxSpinnerService,
    protected notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'fr';
    this.commonService.getCodes('langues').subscribe((data) => {
      this.langues = ConstanteService.getDatas(data);
    });
    this.item = new Users();
    this.loginService.account.subscribe((data) => {
      this.item = data;
      // this.buildForm();
    });
    // this.buildForm();
  }

  // protected buildForm(): void {
  //   this.form = this.fb.group({
  //     firstName: this.fb.control(this.item.firstName, [Validators.required]),
  //     lastName: this.fb.control(this.item.lastName, [Validators.required]),
  //     email: this.fb.control(this.item.email, [Validators.required]),
  //     telephone: this.fb.control(this.item.telephone),
  //     locale: this.fb.control(this.item.locale),
  //   });
  //   this.subscribe();
  // }
  // private subscribe(): void {
  //   if (!this.form) {
  //     this.buildForm();
  //   }
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
  //   this.form
  //     .get('locale')
  //     .valueChanges.subscribe((value) => (this.item.locale = value));
  // }

  updatePref() {
    this.service.updatePref(this.item).subscribe(
      (data) => {
        // this.selectLanguage(this.item.locale);
        this.spinner.hide();
        this.notificationService.openSnackBar(
          'succes',
          'msg.update.item.succes',
          { f: this.translate.instant('preferences') },
          ''
        );
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  selectLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.lang = lang;
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
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
