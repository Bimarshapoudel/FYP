import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-teacher-welcome',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatListSubheaderCssMatStyler, MatLineModule],
  templateUrl: './teacher-welcome.component.html',
  styleUrl: './teacher-welcome.component.css'
})
export class TeacherWelcomeComponent {
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
