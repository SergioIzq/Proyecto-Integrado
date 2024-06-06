import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermedadDetailComponent } from './enfermedad-detail.component';

describe('EnfermedadDetailComponent', () => {
  let component: EnfermedadDetailComponent;
  let fixture: ComponentFixture<EnfermedadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnfermedadDetailComponent]
    });
    fixture = TestBed.createComponent(EnfermedadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
