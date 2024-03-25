import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  public getQuestionsofQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }
  public getQuestionsofQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  // add quiz
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question)
  }

  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }


}
