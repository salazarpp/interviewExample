import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DashboardComponent } from './dashboard.component';
import { MsalService, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration, BroadcastService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Configuration } from 'msal';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: MockStore;
  let authSerivice;

  beforeEach(async(() => {
    authSerivice = {
      getData: () => [],
      startLogin: () => [],
      login: () => [],
    };
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
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
    fixture = TestBed.createComponent(DashboardComponent);
    mockStore = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
