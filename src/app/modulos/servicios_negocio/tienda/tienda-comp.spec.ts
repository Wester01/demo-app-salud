import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaComp } from './tienda-comp';

describe('TiendaComp', () => {
  let component: TiendaComp;
  let fixture: ComponentFixture<TiendaComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendaComp],
    }).compileComponents();

    fixture = TestBed.createComponent(TiendaComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
