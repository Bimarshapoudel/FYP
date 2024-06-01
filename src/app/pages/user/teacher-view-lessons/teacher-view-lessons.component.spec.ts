import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewLessonsComponent } from './teacher-view-lessons.component';

describe('TeacherViewLessonsComponent', () => {
  let component: TeacherViewLessonsComponent;
  let fixture: ComponentFixture<TeacherViewLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherViewLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherViewLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
