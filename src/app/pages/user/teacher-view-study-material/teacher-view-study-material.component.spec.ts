import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewStudyMaterialComponent } from './teacher-view-study-material.component';

describe('TeacherViewStudyMaterialComponent', () => {
  let component: TeacherViewStudyMaterialComponent;
  let fixture: ComponentFixture<TeacherViewStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherViewStudyMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherViewStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
