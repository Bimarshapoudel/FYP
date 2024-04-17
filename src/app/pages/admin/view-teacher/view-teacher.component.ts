import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [CommonModule, MatTableModule, CdkTableModule],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css'
})
export class ViewTeacherComponent {
  teacher: any[] = [{
    profilePic: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }];
  displayedColumns: string[] = ['photo', 'name', 'email', 'username', 'phone'];
  constructor(private _user: UserService) { }

  ngOnInit(): void {
    this._user.getTeachers().subscribe({
      next: (data: any) => {
        this.teacher = data;
        console.log(data)
      }, error(err: any) {
        alert('No Teachers found')
      }
    })
  }
}
