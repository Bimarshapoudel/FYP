import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { StudyMaterialService } from '../../../services/study-material.service';

@Component({
  selector: 'app-teacher-add-study-material',
  standalone: true,
  imports: [RouterLink, CommonModule, MatInputModule, MatCard, FormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './teacher-add-study-material.component.html',
  styleUrl: './teacher-add-study-material.component.css'
})
export class TeacherAddStudyMaterialComponent {
  constructor(private _study: StudyMaterialService, private _ar: ActivatedRoute) { }
  fileToUpload: File | null = null;
  lessonId = this._ar.snapshot.params['lid'];
  description: string = '';
  errorMessage: string = '';

  formsubmit() {
    if (!this.fileToUpload || !this.lessonId || !this.description) {
      this.errorMessage = 'Please select a file, lesson ID, and description';
      return;
    }
    this.errorMessage = '';
    this._study.postStudyMaterial(this.fileToUpload, this.lessonId, this.description).subscribe({
      next: (data: any) => {
        console.log(data)
        Swal.fire('Success', 'Study Material is added successfully', 'success');
        this.description = '';
        this.fileToUpload = null;
      }, error: (error: any) => {
        console.log(error)
        this.errorMessage = 'Please select a different file, lesson ID, and description';
      },
      complete: () => {
        console.log("Request Completed")
      }

    })
  }

  onChangeFileField(event: any) {
    console.log(event.target.files[0])
    this.fileToUpload = event.target.files[0]
    console.log(this.fileToUpload)
  }
}