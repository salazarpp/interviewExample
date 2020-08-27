import { Injectable } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private broadcastService: BroadcastService, private msalService: MsalService) { }
  title = 'Party App';
  isIframe = false;
  loggedIn = false;
  startLogin(): any {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkAccount();
    });

    this.msalService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response.accessToken);
    });

    this.msalService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  checkAccount(): any {
    this.loggedIn = !!this.msalService.getAccount();
  }

  login(): any {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.msalService.loginRedirect();
    } else {
      this.msalService.loginPopup();
    }
  }

  logout(): any {
    this.msalService.logout();
  }
}
