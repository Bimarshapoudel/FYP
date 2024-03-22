import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatSlideToggleModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {
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




  constructor(private _cat: CategoryService, private snack: MatSnackBar, private _quiz: QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;

        console.log(data)
      },
      error: (error) => {
        console.log('error');
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
