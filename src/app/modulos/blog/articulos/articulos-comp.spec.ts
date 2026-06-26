import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosComp } from './articulos-comp';

describe('ArticulosComp', () => {
  let component: ArticulosComp;
  let fixture: ComponentFixture<ArticulosComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticulosComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticulosComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
