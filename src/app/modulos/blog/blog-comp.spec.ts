import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComp } from './blog-comp';

describe('BlogComp', () => {
  let component: BlogComp;
  let fixture: ComponentFixture<BlogComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComp],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
