import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPageRecordsComponent } from './show-page-records.component';

describe('ShowPageRecordsComponent', () => {
  let component: ShowPageRecordsComponent;
  let fixture: ComponentFixture<ShowPageRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPageRecordsComponent]
    });
    fixture = TestBed.createComponent(ShowPageRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
