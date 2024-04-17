import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-enroll-teacher',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './enroll-teacher.component.html',
  styleUrl: './enroll-teacher.component.css'
})
export class EnrollTeacherComponent {
  categories = [{
    cid: 0,
    title: ''
  }
  ];
  teacher = [{
    id: 0,
    firstName: '',
    lastName: ''
  }]
  userId!: number;
  categoryId!: number;
  errorMessage: string = '';
  constructor(private enrollmentService: EnrollmentService, private _user: UserService, private _course: CategoryService) { }

  ngOnInit(): void {
    this._course.categories().subscribe({
      next: (data: any) => {
        this.categories = data;

        console.log(data)
      },
      error: (error) => {
        console.log('error');
      }
    })

    this._user.getTeachers().subscribe({
      next: (data: any) => {
        this.teacher = data;

        console.log(data)
      },
      error: (error) => {
        console.log('error');
      }
    })
  }

  enrollUser() {
    console.log(this.userId);
    console.log(this.categoryId);
    this.enrollmentService.enrollUserInCategory(this.userId, this.categoryId).subscribe({
      next: (data: any) => {
        console.log(data);
        // Display success message using a toast or alert
        Swal.fire('Success', 'Teacher Enrolled Successfully', 'success');
      },
      error: (error: any) => {
        console.log(error);
        this.errorMessage = 'Student cannot be enrolled';
      },
      complete: () => {
        console.log('Request Completed');
      }
    });
  }
}
