import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownComponent } from './countdown.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let mockStore: MockStore;
  let authSerivice;

  beforeEach(async(() => {
    authSerivice = {
      getData: () => [],
      startLogin: () => [],
      login: () => [],
    };
    TestBed.configureTestingModule({
      declarations: [ CountdownComponent ],
      imports: [HttpClientModule],
      providers: [
        provideMockStore(),
        { provide: AuthService, useValue: authSerivice }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownComponent);
    mockStore = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
