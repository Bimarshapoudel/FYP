import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-teacher-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, MatCardModule, MatIcon, MatIconModule, RouterLink],
  templateUrl: './teacher-sidebar.component.html',
  styleUrl: './teacher-sidebar.component.css'
})
export class TeacherSidebarComponent {
  categories = [{
    cid: '',
    title: '',
    description: ''
  }];
  userID = this._login.getUserId();
  constructor(private _cat: CategoryService, private _login: LoginService) { }

  ngOnInit(): void {

    const userDataStr = localStorage.getItem('userData');


    this._cat.getEnrolledCourses(this.userID).subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.userID)
        console.log(this.categories)
      },
      error: () => {
        Swal.fire('Error', 'Error in loading categoreis', 'error')
      }
    })
  }
}
