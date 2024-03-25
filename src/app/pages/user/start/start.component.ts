import { CommonModule, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  qid: any;
  question = [{
    quesId: '',
    image: '',
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      qid: '',
      title: ''
    }
  }];
  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute,
    private _question: QuestionService) {

  }
  ngOnInit(): void {
    this.preventBackButton();

    this.qid = this._route.snapshot.params['qid'];

    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsofQuizForTest(this.qid).subscribe({
      next: (data: any) => {
        this.question = data
        console.log(this.question)
      }, error: (error) => {
        Swal.fire("Error", "Error in loadingh quiz", "error")
      }
    })
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href)
    })
  }

}
