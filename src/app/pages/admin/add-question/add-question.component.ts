import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {

  qId: any;
  qTitle: any;
  question = {
    quiz: {
      qid: ''

    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }
  constructor(private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid']
    this.qTitle = this._route.snapshot.params['title']
    this.question.quiz['qid'] = this.qId
  }

  addQuestion() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    this._question.addQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire('Success', 'Question added successfully', 'success')
        this.question = {
          quiz: {
            qid: this.qId

          },
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: ''
        }
      }, error: (error) => {
        Swal.fire('Error', 'Failed to added Question', 'error')
      }
    })
  }
}
