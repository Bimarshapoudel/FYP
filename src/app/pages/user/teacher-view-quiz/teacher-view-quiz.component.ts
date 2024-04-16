import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-view-quiz',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './teacher-view-quiz.component.html',
  styleUrl: './teacher-view-quiz.component.css'
})
export class TeacherViewQuizComponent {
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
            }, error: () => {
              alert("Error in loading quiz data")
            }
          })
        }
      }
    })
  };
}
