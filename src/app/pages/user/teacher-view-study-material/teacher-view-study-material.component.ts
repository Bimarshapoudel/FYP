import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { RouterLink, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { StudyMaterialService } from '../../../services/study-material.service';

@Component({
  selector: 'app-teacher-view-study-material',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './teacher-view-study-material.component.html',
  styleUrl: './teacher-view-study-material.component.css'
})
export class TeacherViewStudyMaterialComponent {
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
  deleteStudy(sid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        this._study.DeleteStudyMaerial(sid).subscribe({
          next: (data: any) => {

            this.studyMaterial = this.studyMaterial.filter((studyMaterial) => studyMaterial.id != sid)
            Swal.fire('Success', 'Study Material deleted', 'success');
          }, error(error: any) {
            Swal.fire('Error', 'Error in deleting Quiz', 'error');
          }
        });
      }
    })

  }
}
