import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquizzesComponent } from './myquizzes.component';

describe('MyquizzesComponent', () => {
  let component: MyquizzesComponent;
  let fixture: ComponentFixture<MyquizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyquizzesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyquizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
