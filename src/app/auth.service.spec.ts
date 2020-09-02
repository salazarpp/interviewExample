import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { MsalService, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration, BroadcastService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { Configuration } from 'msal';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        MsalService,
        {
          provide: MSAL_CONFIG,
          useValue: {
            auth: {
              clientId: environment.clientId, // This is your client ID
              authority: environment.authority, // This is your tenant info
              redirectUri: 'http://localhost:9876' // This is your redirect URI
            },
            cache: {
              cacheLocation: 'localStorage',
              storeAuthStateInCookie: false
            },
          } as Configuration
        },
        {
          provide: MSAL_CONFIG_ANGULAR,
          useValue: {
            popUp: false,
            consentScopes: [ 'user.read' ],
            unprotectedResources: [],
            protectedResourceMap: [
              ['https://graph.microsoft.com/v1.0/me', ['user.read']]
            ]
          } as MsalAngularConfiguration
        },
        BroadcastService
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
