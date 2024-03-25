import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student-load-quiz',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './student-load-quiz.component.html',
  styleUrl: './student-load-quiz.component.css'
})
export class StudentLoadQuizComponent {
  catId: any;
  quizzes = [
    {
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
  ];
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
    this.catId = this._route.snapshot.params['catId'];

    this._route.params.subscribe({
      next: (params: any) => {
        this.catId = params['catid'];
        if (this.catId == 0) {
          console.log('L0ad all the quiz')
          this._quiz.quizzez().subscribe({
            next: (data: any) => {
              this.quizzes = data;
              console.log(this.quizzes)
            }, error: (error) => {
              Swal.fire('Error', 'Could not load quizzez', 'error')
            }
          })
        }
        else {
          this._quiz.getQuizzesOfCategory(this.catId).subscribe({
            next: (data: any) => {
              this.quizzes = data;
            }, error: (error) => {
              alert("Error in loading quiz data")
            }
          })
        }
      }
    })
  };

}
