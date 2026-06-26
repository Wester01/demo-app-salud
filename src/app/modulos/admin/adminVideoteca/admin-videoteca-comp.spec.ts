import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideotecaComp } from './admin-videoteca-comp';

describe('AdminVideotecaComp', () => {
  let component: AdminVideotecaComp;
  let fixture: ComponentFixture<AdminVideotecaComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVideotecaComp],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVideotecaComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
