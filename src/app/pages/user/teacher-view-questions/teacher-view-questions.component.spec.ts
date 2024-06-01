import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewQuestionsComponent } from './teacher-view-questions.component';

describe('TeacherViewQuestionsComponent', () => {
  let component: TeacherViewQuestionsComponent;
  let fixture: ComponentFixture<TeacherViewQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherViewQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherViewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
