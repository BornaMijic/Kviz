import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesonhomeComponent } from './quizzesonhome.component';

describe('QuizzesonhomeComponent', () => {
  let component: QuizzesonhomeComponent;
  let fixture: ComponentFixture<QuizzesonhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzesonhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesonhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
