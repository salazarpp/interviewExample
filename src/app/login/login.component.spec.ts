import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MsalService, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, BroadcastService, MsalAngularConfiguration } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Configuration } from 'msal';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore;
  let authSerivice;

  beforeEach(async(() => {
    authSerivice = {
      getData: () => [],
      startLogin: () => [],
      login: () => [],
    };
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        provideMockStore(),
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
        BroadcastService,
        { provide: AuthService, useValue: authSerivice }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    mockStore = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
