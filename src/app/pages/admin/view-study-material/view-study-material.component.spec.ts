import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudyMaterialComponent } from './view-study-material.component';

describe('ViewStudyMaterialComponent', () => {
  let component: ViewStudyMaterialComponent;
  let fixture: ComponentFixture<ViewStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudyMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
