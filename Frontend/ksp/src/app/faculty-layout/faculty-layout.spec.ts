import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyLayout } from './faculty-layout';

describe('FacultyLayout', () => {
  let component: FacultyLayout;
  let fixture: ComponentFixture<FacultyLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
