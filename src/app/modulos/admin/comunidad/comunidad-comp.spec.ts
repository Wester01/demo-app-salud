import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadComp } from './comunidad-comp';

describe('ComunidadComp', () => {
  let component: ComunidadComp;
  let fixture: ComponentFixture<ComunidadComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunidadComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ComunidadComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
