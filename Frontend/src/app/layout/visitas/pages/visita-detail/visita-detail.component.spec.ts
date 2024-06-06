import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaDetailComponent } from './visita-detail.component';

describe('VisitaDetailComponent', () => {
  let component: VisitaDetailComponent;
  let fixture: ComponentFixture<VisitaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitaDetailComponent]
    });
    fixture = TestBed.createComponent(VisitaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
