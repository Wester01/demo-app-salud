import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComp } from './analytics-comp';

describe('AnalyticsComp', () => {
  let component: AnalyticsComp;
  let fixture: ComponentFixture<AnalyticsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComp],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
