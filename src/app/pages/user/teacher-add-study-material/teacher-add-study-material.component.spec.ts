import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddStudyMaterialComponent } from './teacher-add-study-material.component';

describe('TeacherAddStudyMaterialComponent', () => {
  let component: TeacherAddStudyMaterialComponent;
  let fixture: ComponentFixture<TeacherAddStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddStudyMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherAddStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
