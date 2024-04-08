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

@Component({
  selector: 'app-view-study-material',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './view-study-material.component.html',
  styleUrl: './view-study-material.component.css'
})
export class ViewStudyMaterialComponent {
  studyMaterial = [{
    id: '',
    title: '',
    description: '',
    fileType: '',
    filePath: '',
    lesson: {
      lid: ''
    }
  }];
  lid: any;
  title: String = '';
  constructor(private _route: ActivatedRoute, private _study: StudyMaterialService) { }

  ngOnInit(): void {
    this.lid = this._route.snapshot.params['lid'];
    this.title = this._route.snapshot.params['title'];
    this._study.getStudyMaterialofLesson(this.lid).subscribe({
      next: (data: any) => {
        this.studyMaterial = data
        console.log(data)

      }, error: (error) => {
        console.log(error)
      }
    })
  }
}
