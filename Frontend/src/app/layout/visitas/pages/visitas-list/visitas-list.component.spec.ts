import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasListComponent } from './visitas-list.component';

describe('VisitasListComponent', () => {
  let component: VisitasListComponent;
  let fixture: ComponentFixture<VisitasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitasListComponent]
    });
    fixture = TestBed.createComponent(VisitasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
