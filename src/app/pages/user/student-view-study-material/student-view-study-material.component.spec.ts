import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewStudyMaterialComponent } from './student-view-study-material.component';

describe('StudentViewStudyMaterialComponent', () => {
  let component: StudentViewStudyMaterialComponent;
  let fixture: ComponentFixture<StudentViewStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentViewStudyMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentViewStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
