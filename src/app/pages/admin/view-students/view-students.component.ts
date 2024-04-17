import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, CdkTableModule],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css'
})
export class ViewStudentsComponent {
  student: any[] = [{
    profilePic: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }];
  filteredStudents: any[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['photo', 'name', 'email', 'username', 'phone'];
  constructor(private _user: UserService) { }

  ngOnInit(): void {
    this._user.getStudents().subscribe({
      next: (data: any) => {
        this.student = data;
        console.log(data)
      }, error(err: any) {
        alert('No students found')
      }
    })
  }
}
