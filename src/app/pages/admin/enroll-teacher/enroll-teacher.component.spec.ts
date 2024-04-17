import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollTeacherComponent } from './enroll-teacher.component';

describe('EnrollTeacherComponent', () => {
  let component: EnrollTeacherComponent;
  let fixture: ComponentFixture<EnrollTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
