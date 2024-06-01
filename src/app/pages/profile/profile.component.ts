import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatCardModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  newPassword: any;
  confirmPassword: any;
  userId: any;
  showCommentBox = false;
  openCommentBox() {
    this.showCommentBox = !this.showCommentBox;

  }
  constructor(private login: LoginService, private _user: UserService) {

  }
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.userId = this.login.getUserId();
    console.log(this.user)
    // this.login.getCurrentUser().subscribe({
    //   next: (user: any) => {
    //     this.user = user;
    //   },
    //   error: (error: any) => {
    //     alert('error');
    //   }
    // });
  }
  onChangePassword() {

    if (this.confirmPassword == this.newPassword) {
      this._user.changePassword(this.userId, this.newPassword).subscribe({
        next(value) {


        },
        error(err) {
          console.error(err);
        }

      });
      Swal.fire('Success', 'Password changed', 'success');
      this.newPassword = ''






    } else {
      Swal.fire('Error', 'Password doesnot match ', 'error');
    }
  }
}
