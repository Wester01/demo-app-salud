import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturaArticuloComp } from './lectura-articulo-comp';

describe('LecturaArticuloComp', () => {
  let component: LecturaArticuloComp;
  let fixture: ComponentFixture<LecturaArticuloComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturaArticuloComp],
    }).compileComponents();

    fixture = TestBed.createComponent(LecturaArticuloComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
