import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { StudyMaterialService } from '../../../services/study-material.service';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-add-study-material',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCard, FormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-study-material.component.html',
  styleUrl: './add-study-material.component.css'
})
export class AddStudyMaterialComponent {

  constructor(private _study: StudyMaterialService) { }
  fileToUpload: File | null = null;
  lessonId: number | null = null;
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
      }, error: (error: any) => {
        console.log(error)
        alert("error")
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
