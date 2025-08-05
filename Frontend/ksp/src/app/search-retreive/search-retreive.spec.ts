import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRetreive } from './search-retreive';

describe('SearchRetreive', () => {
  let component: SearchRetreive;
  let fixture: ComponentFixture<SearchRetreive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRetreive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRetreive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
