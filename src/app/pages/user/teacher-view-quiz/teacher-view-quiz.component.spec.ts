import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewQuizComponent } from './teacher-view-quiz.component';

describe('TeacherViewQuizComponent', () => {
  let component: TeacherViewQuizComponent;
  let fixture: ComponentFixture<TeacherViewQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherViewQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherViewQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
