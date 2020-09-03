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

    });

    this.msalService.setLogger(new Logger((logLevel, message, piiEnabled) => {
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  checkAccount(): any {
    this.loggedIn = !!this.msalService.getAccount();
  }

  login(): any {
    this.msalService.loginRedirect();
  }

  logout(): any {
    this.msalService.logout();
  }

  getData(): any {
    return this.msalService.getAccount();
  }
}
