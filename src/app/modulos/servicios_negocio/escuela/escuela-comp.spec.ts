import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaComp } from './escuela-comp';

describe('EscuelaComp', () => {
  let component: EscuelaComp;
  let fixture: ComponentFixture<EscuelaComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaComp],
    }).compileComponents();

    fixture = TestBed.createComponent(EscuelaComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
