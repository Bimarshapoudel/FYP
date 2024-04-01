import { CommonModule, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MatProgressSpinnerModule, FormsModule, RouterModule, CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

  qid: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;

  timer: any;


  question: any[] = [];
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
        this.question = data;
        this.timer = this.question.length * 2 * 60;


        console.log(this.question)
        this.startTimer();

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


  submitQuiz() {
    Swal.fire({
      title: "Do you want to submit the quiz?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Submit",

    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }
  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min: ${ss} sec`;
  }
  evalQuiz() {
    // call to serve to check questions
    this._question.evalQuiz(this.question).subscribe({
      next: (data: any) => {
        console.log(data)
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      }, error: (error) => {
        console.log(error)
      }
    })

    // this.question.forEach(q => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.question[0].quiz.maxMarks / this.question.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }

    // });



    // console.log("Correct Answers" + this.correctAnswers)
    // console.log(this.marksGot)
  }
  printPage() {
    window.print();
  }

}
