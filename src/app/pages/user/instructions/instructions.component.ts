import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, RouterModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {

  qid: any;

  quiz = [{
    qid: '', title: '', description: '', maxMarks: '', numberOfQuestions: '',
    active: '',
    category: {
      title: ''
    }
  }];
  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe({
      next: (data: any) => {
        this.quiz = data;


      }, error: (error) => {
        alert('Error in loading data')
      }
    });

  }
  startQuiz() {
    Swal.fire({
      title: "Do you want to start the quiz?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Start",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.qid])
      }
    });
  }

}
