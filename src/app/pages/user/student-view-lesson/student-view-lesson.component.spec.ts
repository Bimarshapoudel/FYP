import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewLessonComponent } from './student-view-lesson.component';

describe('StudentViewLessonComponent', () => {
  let component: StudentViewLessonComponent;
  let fixture: ComponentFixture<StudentViewLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentViewLessonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentViewLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
