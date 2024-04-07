import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudyMaterialService } from '../../../services/study-material.service';
@Component({
  selector: 'app-add-study-material',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatCard, FormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-study-material.component.html',
  styleUrl: './add-study-material.component.css'
})
export class AddStudyMaterialComponent {

  constructor(private _study: StudyMaterialService) { }
  Studymaterial = {
    title: '',
    description: '',
    file: File
  }
  formsubmit() {
    this._study.postStudyMaterial(this.Studymaterial).subscribe({
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
    this.Studymaterial.file = event.target.files[0]
    console.log(this.Studymaterial.file)
  }
}
