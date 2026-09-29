import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraDeDanosComponent } from './calculadora-de-danos.component';

describe('CalculadoraDeDanosComponent', () => {
  let component: CalculadoraDeDanosComponent;
  let fixture: ComponentFixture<CalculadoraDeDanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculadoraDeDanosComponent]
    });
    fixture = TestBed.createComponent(CalculadoraDeDanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
