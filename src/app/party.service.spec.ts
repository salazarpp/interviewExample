import { TestBed } from '@angular/core/testing';

import { PartyService } from './party.service';
import { HttpClientModule } from '@angular/common/http';

describe('PartyService', () => {
  let service: PartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PartyService]
    });
    service = TestBed.inject(PartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
