import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LessonService } from '../../../services/lesson.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  categories = [{
    cid: '',
    title: ''
  }
  ];
  lessonData = {
    title: '',
    description: '',
    category: {
      cid: ''
    }
  }
  constructor(private _cat: CategoryService, private snack: MatSnackBar, private _lesson: LessonService) { }


  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;

        console.log(data)
      },
      error: (error) => {
        console.log('error');
      }
    })

  }
  addLesson() {
    if (this.lessonData.title.trim() == '' || this.lessonData == null) {
      this.snack.open("Title Required", '', {
        duration: 3000
      });
      return;
    }

    // call server
    this._lesson.addlesson(this.lessonData).subscribe({
      next: (data: any) => {
        Swal.fire('Success', 'Quiz is added successfully', 'success')
        this.lessonData = {
          title: '',
          description: '',
          category: {
            cid: ''
          }
        };

      }, error: (error: any) => {
        Swal.fire('Error', 'Quiz is not added', 'error')
      }
    })


  }
}

