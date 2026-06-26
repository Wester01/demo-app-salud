import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosComp } from './servicios-comp';

describe('ServiciosComp', () => {
  let component: ServiciosComp;
  let fixture: ComponentFixture<ServiciosComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
