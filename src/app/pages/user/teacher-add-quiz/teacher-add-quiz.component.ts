import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-teacher-add-quiz',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatSlideToggleModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './teacher-add-quiz.component.html',
  styleUrl: './teacher-add-quiz.component.css'
})
export class TeacherAddQuizComponent {
  userID = this._login.getUserId();
  categories = [{
    cid: '',
    title: ''
  }
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    }
  };




  constructor(private _cat: CategoryService, private snack: MatSnackBar, private _quiz: QuizService, private _login: LoginService) { }

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

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData == null) {
      this.snack.open("Title Required", '', {
        duration: 3000
      });
      return;
    }

    // call server
    this._quiz.addquiz(this.quizData).subscribe({
      next: (data: any) => {
        Swal.fire('Success', 'Quiz is added successfully', 'success')
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
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
