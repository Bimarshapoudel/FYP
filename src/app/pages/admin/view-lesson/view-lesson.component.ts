import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { LessonService } from '../../../services/lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-lesson',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './view-lesson.component.html',
  styleUrl: './view-lesson.component.css'
})
export class ViewLessonComponent {
  lessons = [{
    lid: '',
    title: '',
    description: '',
    category: {
      title: ''
    }
  }]

  constructor(private lesson: LessonService) { }

  ngOnInit(): void {
    this.lesson.lessons().subscribe({
      next: (data: any) => {
        this.lessons = data;

        console.log(this.lessons)
      },
      error: (error: any) => {
        console.log(error)
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
        this.lesson.deleteLesson(lid).subscribe({
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
