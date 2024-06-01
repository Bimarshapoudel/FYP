import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudyMaterialService } from '../../../services/study-material.service';
import baseUrl from '../../../services/helper';

@Component({
  selector: 'app-student-view-study-material',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './student-view-study-material.component.html',
  styleUrl: './student-view-study-material.component.css'
})
export class StudentViewStudyMaterialComponent {
  studyMaterial: any[] = [];
  lid: any;
  title: String = '';
  constructor(private _route: ActivatedRoute, private _study: StudyMaterialService) { }
  ngOnInit() {
    this.lid = this._route.snapshot.params['lid'];
    this.title = this._route.snapshot.params['title'];
    this._study.getStudyMaterialofLesson(this.lid).subscribe({
      next: (data: any) => {
        this.studyMaterial = data;
        this.studyMaterial.forEach(studyMaterial => {
          studyMaterial.filePath = `${baseUrl}/${studyMaterial.filePath}`;
        });
        console.log(data)

      }, error: (error) => {
        console.log(error)
      }
    })
  }
  downloadFile(id: number): void {
    this._study.downloadFile(id).subscribe(
      blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `file_${id}}`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error => {
        console.error('Error downloading file', error);
      }
    );
  }
}
