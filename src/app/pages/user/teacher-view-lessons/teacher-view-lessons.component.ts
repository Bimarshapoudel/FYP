import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../services/lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-view-lessons',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './teacher-view-lessons.component.html',
  styleUrl: './teacher-view-lessons.component.css'
})
export class TeacherViewLessonsComponent {
  catId: number = 0;
  lessons = [{
    lid: '',
    title: '',
    description: '',
    category: {
      title: ''
    }
  }]
  constructor(private _route: ActivatedRoute, private _lesson: LessonService) { }

  ngOnInit() {
    this.catId = this._route.snapshot.params['catid'];
    console.log(this.catId);
    this._lesson.getLessonOfCategory(this.catId).subscribe({
      next: (data: any) => {
        this.lessons = data;
        console.log(this.lessons)

      }, error: () => {
        alert("Error in loading lesson data")
      }
    })
  }
  deleteQuiz(lid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        this._lesson.deleteLesson(lid).subscribe({
          next: (data: any) => {

            this.lessons = this.lessons.filter((lesson) => lesson.lid != lid)
            Swal.fire('Success', 'Quiz deleted', 'success');
          }, error(error: any) {
            Swal.fire('Error', 'Error in deleting Quiz', 'error');
          }
        });
      }
    })

  }
}
