import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDashboradHeader } from './faculty-dashborad-header';

describe('FacultyDashboradHeader', () => {
  let component: FacultyDashboradHeader;
  let fixture: ComponentFixture<FacultyDashboradHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyDashboradHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyDashboradHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
