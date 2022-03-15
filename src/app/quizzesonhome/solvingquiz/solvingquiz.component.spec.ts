import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvingquizComponent } from './solvingquiz.component';

describe('SolvingquizComponent', () => {
  let component: SolvingquizComponent;
  let fixture: ComponentFixture<SolvingquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvingquizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvingquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
