import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryadministrationComponent } from './categoryadministration.component';

describe('CategoryadministrationComponent', () => {
  let component: CategoryadministrationComponent;
  let fixture: ComponentFixture<CategoryadministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryadministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryadministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
