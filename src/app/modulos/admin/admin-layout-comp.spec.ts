import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComp } from './admin-layout-comp';

describe('AdminLayoutComp', () => {
  let component: AdminLayoutComp;
  let fixture: ComponentFixture<AdminLayoutComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComp],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLayoutComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
