import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoComp } from './contacto-comp';

describe('ContactoComp', () => {
  let component: ContactoComp;
  let fixture: ComponentFixture<ContactoComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
