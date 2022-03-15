import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizadministrationComponent } from './quizadministration.component';

describe('QuizadministrationComponent', () => {
  let component: QuizadministrationComponent;
  let fixture: ComponentFixture<QuizadministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizadministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizadministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
