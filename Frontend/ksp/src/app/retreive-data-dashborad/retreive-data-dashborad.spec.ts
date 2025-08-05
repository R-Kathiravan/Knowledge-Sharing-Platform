import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetreiveDataDashborad } from './retreive-data-dashborad';

describe('RetreiveDataDashborad', () => {
  let component: RetreiveDataDashborad;
  let fixture: ComponentFixture<RetreiveDataDashborad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetreiveDataDashborad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetreiveDataDashborad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
