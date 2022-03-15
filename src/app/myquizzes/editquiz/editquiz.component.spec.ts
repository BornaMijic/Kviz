import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditquizComponent } from './editquiz.component';

describe('EditquizComponent', () => {
  let component: EditquizComponent;
  let fixture: ComponentFixture<EditquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditquizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
