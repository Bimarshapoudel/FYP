import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent {
  quizzes = [{
    qid: '',
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: '',
    category: {
      title: ''
    }
  }
  ]

  constructor(private quiz: QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzez().subscribe({
      next: (data: any) => {
        this.quizzes = data;

        console.log(this.quizzes)
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  deleteQuiz(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        this.quiz.deleteQuiz(qid).subscribe({
          next: (data: any) => {

            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid)
            Swal.fire('Success', 'Quiz deleted', 'success');
          }, error(error: any) {
            Swal.fire('Error', 'Error in deleting Quiz', 'error');
          }
        });
      }
    })

  }
}
