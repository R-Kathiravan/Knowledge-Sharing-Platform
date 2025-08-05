import { TestBed } from '@angular/core/testing';

import { SupervisorServices } from './supervisor-services';

describe('SupervisorServices', () => {
  let service: SupervisorServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupervisorServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
