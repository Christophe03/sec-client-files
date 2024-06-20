import { APP_INITIALIZER, NgModule } from '@angular/core';

// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as date_fns_2 from 'date-fns';
import * as tslib_1 from 'tslib';

function adapterFactory() {
  return tslib_1.__assign(tslib_1.__assign({}), date_fns_2);
}

import { OverlayContainer } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from 'src/environments/environment';
import { JwtInterceptorService } from './@common/interceptor/jwt-interceptor.service';
import { LanguageInterceptor } from './@common/interceptor/language.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppSettings } from './app.settings';
import { ErrorComponent } from './pages/errors/error/error.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { PipesModule } from './theme/pipes/pipes.module';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
registerLocaleData(localeFr, 'fr-FR');

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.assetUrl, '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient],
      },
    }),

    SharedModule,
    PipesModule,
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sec-clients-files',
        appId: '1:614236663434:web:7f90a80508b63cf0c2c773',
        storageBucket: 'sec-clients-files.appspot.com',
        apiKey: 'AIzaSyCVfObHyeusrRqIKmDbPbSRs6EWCc6DI34',
        authDomain: 'sec-clients-files.firebaseapp.com',
        messagingSenderId: '614236663434',
        measurementId: 'G-59J1DX1H98',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    ErrorComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    SidenavComponent,
  ],
  providers: [
    AppSettings,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
