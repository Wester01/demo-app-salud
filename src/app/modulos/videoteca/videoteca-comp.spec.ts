import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideotecaComp } from './videoteca-comp';

describe('VideotecaComp', () => {
  let component: VideotecaComp;
  let fixture: ComponentFixture<VideotecaComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideotecaComp],
    }).compileComponents();

    fixture = TestBed.createComponent(VideotecaComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
