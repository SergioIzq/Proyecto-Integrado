import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteHistorialComponent } from './paciente-historial.component';

describe('PacienteHistorialComponent', () => {
  let component: PacienteHistorialComponent;
  let fixture: ComponentFixture<PacienteHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteHistorialComponent]
    });
    fixture = TestBed.createComponent(PacienteHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
