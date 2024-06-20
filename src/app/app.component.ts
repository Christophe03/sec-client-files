import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Users } from './@common/models/users';
import { LoginService } from './@common/services/login.service';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { Menu } from './theme/components/menu/menu.model';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

// import { Idle } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public settings: Settings;
  title = 'flex-frontend';
  lang = 'fr';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  menuItems: Menu[] = [];
  item: Users;

  private firestore: Firestore = inject(Firestore);
  constructor(
    public appSettings: AppSettings,
    protected translate: TranslateService,
    // private idle: Idle,
    // private keepalive: Keepalive,
    private loginService: LoginService
  ) {
    // this.setTimeOut();

    this.settings = this.appSettings.settings;
    translate.addLangs(['fr', 'en']);
    localStorage.setItem('lang', 'fr');
    translate.setDefaultLang(this.lang);
    translate.use(this.lang);
  }

  // setTimeOut() {
  //   // sets an idle timeout of 5 seconds, for testing purposes.
  //   this.idle.setIdle(5);
  //   // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
  //   this.idle.setTimeout(5000000);
  //   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
  //   this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  //   this.idle.onIdleEnd.subscribe(() => {
  //     this.idleState = "No longer idle.";
  //   });

  //   this.idle.onTimeout.subscribe(() => {
  //     this.idleState = "Timed out!";
  //     this.timedOut = true;
  //     this.loginService.logout();
  //     // this.router.navigate([projectOption.loginLink]);
  //   });
  //   this.idle.onIdleStart.subscribe(
  //     () => (this.idleState = "You've gone idle!")
  //   );
  //   this.idle.onTimeoutWarning.subscribe(
  //     (countdown) =>
  //       (this.idleState = "You will time out in " + countdown + " seconds!")
  //   );

  //   // sets the ping interval to 15 seconds
  //   this.keepalive.interval(15);

  //   this.keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

  //   this.reset();
  // }

  // reset() {
  //   this.idle.watch();
  //   this.idleState = "Started.";
  //   this.timedOut = false;
  // }

  ngOnInit() {
    // this.loginService.account.subscribe((data) => {
    //   this.item = data;
    //   if (this.item && this.item.locale) {
    //     this.translate.setDefaultLang(this.item.locale);
    //     localStorage.setItem('lang', this.item.locale);
    //     this.translate.use(this.item.locale);
    //   }
    // });

    const docRef = doc(this.firestore, 'users', 'YBld9WXcUmcOei0TFYtvuTIWIpp2');
    getDoc(docRef).then((docSnap) => {
      const currentUser = docSnap.data() as Users;
      this.loginService.updatedAccount(currentUser);
      console.log('UPDATED CURENT USER');
    });
    //Liste des documents
    // const q = query(
    //   collection(this.firestore, 'students_esg')
    //   // where('capital', '==', true)
    // );
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id, ' => ', doc.data());
    // });
  }
}
