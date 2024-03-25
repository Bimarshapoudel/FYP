import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoadQuizComponent } from './student-load-quiz.component';

describe('StudentLoadQuizComponent', () => {
  let component: StudentLoadQuizComponent;
  let fixture: ComponentFixture<StudentLoadQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLoadQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentLoadQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
