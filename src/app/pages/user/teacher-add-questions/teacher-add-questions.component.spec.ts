import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddQuestionsComponent } from './teacher-add-questions.component';

describe('TeacherAddQuestionsComponent', () => {
  let component: TeacherAddQuestionsComponent;
  let fixture: ComponentFixture<TeacherAddQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherAddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
