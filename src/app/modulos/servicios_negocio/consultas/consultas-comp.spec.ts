import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasComp } from './consultas-comp';

describe('ConsultasComp', () => {
  let component: ConsultasComp;
  let fixture: ComponentFixture<ConsultasComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultasComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
