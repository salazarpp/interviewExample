import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule } from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from 'src/environments/environment';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginComponent } from './login/login.component';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from './countdown/countdown.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InvitationComponent,
    LoginComponent,
    CountdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CountdownModule,
    MsalModule.forRoot({
      auth: {
        clientId: environment.clientId, // This is your client ID
        authority: environment.authority, // This is your tenant ID
        redirectUri: environment.redirectUri// This is your redirect URI
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
