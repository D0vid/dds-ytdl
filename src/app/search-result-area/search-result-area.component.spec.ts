import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultAreaComponent } from './search-result-area.component';

describe('SearchResultAreaComponent', () => {
  let component: SearchResultAreaComponent;
  let fixture: ComponentFixture<SearchResultAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
