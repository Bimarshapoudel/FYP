import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddQuizComponent } from './teacher-add-quiz.component';

describe('TeacherAddQuizComponent', () => {
  let component: TeacherAddQuizComponent;
  let fixture: ComponentFixture<TeacherAddQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherAddQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
