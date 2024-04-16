import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWelcomeComponentComponent } from './student-welcome-component.component';

describe('StudentWelcomeComponentComponent', () => {
  let component: StudentWelcomeComponentComponent;
  let fixture: ComponentFixture<StudentWelcomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentWelcomeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentWelcomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
