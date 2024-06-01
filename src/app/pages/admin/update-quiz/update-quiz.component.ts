import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../services/category.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatSlideToggleModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {
  qId = undefined;
  quiz: any;
  categories: any;
  constructor(private _router: Router, private _route: ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId)
    this._quiz.getQuiz(this.qId).subscribe({
      next: (data: any) => {
        this.quiz = data;
        console.log(this.quiz)
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

    this._quiz.updateQuiz(this.quiz).subscribe({
      next: (data: any) => {
        Swal.fire('Update', 'Quiz updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes'])
        });
      }, error: (error) => {
        Swal.fire('Error', 'Error in updating', 'error');
      }
    })
  }
}
