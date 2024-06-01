import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddLessonsComponent } from './teacher-add-lessons.component';

describe('TeacherAddLessonsComponent', () => {
  let component: TeacherAddLessonsComponent;
  let fixture: ComponentFixture<TeacherAddLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherAddLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
