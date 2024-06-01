import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-teacher-view-questions',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './teacher-view-questions.component.html',
  styleUrl: './teacher-view-questions.component.css'
})
export class TeacherViewQuestionsComponent {
  qId: any;
  qTitle: String = '';
  questions = [{
    quesId: '',
    image: '',
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qid: ''
    }
  }
  ];

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsofQuiz(this.qId).subscribe({
      next: (data: any) => {
        this.questions = data
        console.log(data)

      }, error: (error) => {
        console.log(error)
      }
    })


  }

  // delete Question
  deleteQuestion(quesid: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, you want to delete this question?'
    }).then((result) => {
      if (result.isConfirmed) {
        // confirm
        this._question.deleteQuestion(quesid).subscribe({
          next: (data: any) => {
            this._snack.open('Question Delete', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != quesid);
          },
          error: () => {
            this._snack.open('Error in Deleting questions', '', {
              duration: 300
            });
          }
        });
      }
    });
  }
}
