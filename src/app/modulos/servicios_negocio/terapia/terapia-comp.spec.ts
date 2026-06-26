import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapiaComp } from './terapia-comp';

describe('TerapiaComp', () => {
  let component: TerapiaComp;
  let fixture: ComponentFixture<TerapiaComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerapiaComp],
    }).compileComponents();

    fixture = TestBed.createComponent(TerapiaComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
