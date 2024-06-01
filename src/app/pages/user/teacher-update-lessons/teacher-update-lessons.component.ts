import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { LessonService } from '../../../services/lesson.service';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-teacher-update-lessons',
  standalone: true,
  imports: [CommonModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './teacher-update-lessons.component.html',
  styleUrl: './teacher-update-lessons.component.css'
})
export class TeacherUpdateLessonsComponent {
  lid = undefined;
  lesson: any;
  categories: any;

  constructor(private _router: Router, private _route: ActivatedRoute, private _lesson: LessonService, private _cat: CategoryService) {

  }
  ngOnInit(): void {
    this.lid = this._route.snapshot.params['lid'];
    // alert(this.qId)
    this._lesson.getLesson(this.lid).subscribe({
      next: (data: any) => {
        this.lesson = data;
        console.log(this.lesson)
      }, error(error: any) {
        console.log(error)
      }
    });
    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        alert('error')
      }
    })
  }
  // update form
  public updateData() {

    // validate

    this._lesson.updateLessson(this.lesson).subscribe({
      next: (data: any) => {
        Swal.fire('Update', 'Quiz updated', 'success').then((e) => {
          this._router.navigate(['/teacher/lessons'])
        });
      }, error: (error) => {
        Swal.fire('Error', 'Error in updating', 'error');
      }
    })
  }
}