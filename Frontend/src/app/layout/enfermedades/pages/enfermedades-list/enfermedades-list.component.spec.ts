import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermedadesListComponent } from './enfermedades-list.component';

describe('EnfermedadesListComponent', () => {
  let component: EnfermedadesListComponent;
  let fixture: ComponentFixture<EnfermedadesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnfermedadesListComponent]
    });
    fixture = TestBed.createComponent(EnfermedadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
