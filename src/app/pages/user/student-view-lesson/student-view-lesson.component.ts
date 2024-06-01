import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-student-view-lesson',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './student-view-lesson.component.html',
  styleUrl: './student-view-lesson.component.css'
})
export class StudentViewLessonComponent {
  catId: number = 0;
  lessons = [{
    lid: '',
    title: '',
    description: '',
    category: {
      title: ''
    }
  }]
  constructor(private _route: ActivatedRoute, private _lesson: LessonService) { }

  ngOnInit() {
    this.catId = this._route.snapshot.params['catid'];
    console.log(this.catId);
    this._lesson.getLessonOfCategory(this.catId).subscribe({
      next: (data: any) => {
        this.lessons = data;
        console.log(this.lessons)

      }, error: () => {
        alert("Error in loading lesson data")
      }
    })
  }
}
