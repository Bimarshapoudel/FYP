import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { LessonService } from '../../../services/lesson.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-teacher-add-lessons',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './teacher-add-lessons.component.html',
  styleUrl: './teacher-add-lessons.component.css'
})
export class TeacherAddLessonsComponent {
  categories = [{
    cid: '',
    title: ''
  }
  ];
  lessonData = {
    title: '',
    description: '',
    category: {
      cid: ''
    }
  }
  userID = this._login.getUserId();
  constructor(private _cat: CategoryService, private snack: MatSnackBar, private _lesson: LessonService, private _login: LoginService) { }


  ngOnInit(): void {

    this._cat.getEnrolledCourses(this.userID).subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.userID)
        console.log(this.categories)
      },
      error: () => {
        Swal.fire('Error', 'Error in loading categoreis', 'error')
      }
    })

  }
  addLesson() {
    if (this.lessonData.title.trim() == '' || this.lessonData == null) {
      this.snack.open("Title Required", '', {
        duration: 3000
      });
      return;
    }

    // call server
    this._lesson.addlesson(this.lessonData).subscribe({
      next: (data: any) => {
        Swal.fire('Success', 'Quiz is added successfully', 'success')
        this.lessonData = {
          title: '',
          description: '',
          category: {
            cid: ''
          }
        };

      }, error: (error: any) => {
        Swal.fire('Error', 'Quiz is not added', 'error')
      }
    })


  }
}
