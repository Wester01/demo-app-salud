import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComp } from './editor-comp';

describe('EditorComp', () => {
  let component: EditorComp;
  let fixture: ComponentFixture<EditorComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComp],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
