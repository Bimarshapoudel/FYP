import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUpdateLessonsComponent } from './teacher-update-lessons.component';

describe('TeacherUpdateLessonsComponent', () => {
  let component: TeacherUpdateLessonsComponent;
  let fixture: ComponentFixture<TeacherUpdateLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherUpdateLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherUpdateLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
