import { Component, inject } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { projectOption } from 'src/environments/project-option';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from '@angular/fire/firestore';
import { Users } from 'src/app/@common/models/users';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
// export class LoginComponent {}
export class LoginComponent {
  public form: UntypedFormGroup;
  public settings: Settings;
  lang = 'fr';
  hide = true;
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  constructor(
    public appSettings: AppSettings,
    public fb: UntypedFormBuilder,
    public router: Router,
    private loginService: LoginService,
    protected translate: TranslateService,
    private localStorageService: LocalStorageService,
    public notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      login: ['admin', Validators.compose([Validators.required])],
      password: ['123456', Validators.compose([Validators.required])],
    });
  }
  login() {
    // this.spinner.show();
    const fg = this.form.value;
    this.loginService.updatedRole(fg.login);

    this.router.navigate([projectOption.firstLink]);
  }
  newPassword() {
    this.router.navigate([projectOption.newPassword]);
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  showError(error) {
    this.notificationService.open(
      'error',
      ConstanteService.getErrorMessage(error),
      ''
    );
  }
  myShowError(error) {
    this.notificationService.open('error', error, '');
  }
}
