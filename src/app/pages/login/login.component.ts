import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule, MatIconModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  JSON: any;

  constructor(private snack: MatSnackBar, private fb: FormBuilder, private login: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  formSubmit() {

    // request to server to generate token
    this.login.generateToken(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log("success");
        console.log(data);

        //login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe({
          next: (user: any) => {
            this.login.setUser(user);
            console.log(user);

            // redirect on basis of role
            if (this.login.getUserRole() === "ADMIN") {
              //admin
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);

            }
            else if (this.login.getUserRole() === "TEACHER") {
              this.router.navigate(['teacher']);
              this.login.loginStatusSubject.next(true);

            }
            else if (this.login.getUserRole() === "STUDENT") {
              this.router.navigate(['student/0']);
              this.login.loginStatusSubject.next(true);

            }
            else {
              this.login.logout();
            }
          }
        })
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('error', 'Inavlid username or password', 'error')

      }
    }

    )

  }
  clearForm() {
    this.loginForm.reset(); // Clear the form manually
  }

  // login() {
  //   this.userService.login(this.loginForm.value).subscribe(
  //     (res) => {
  //       console.log(res);

  //       if (res != null) {
  //         Swal.fire('Success', 'User successfully registered', 'success');
  //       } else {
  //         alert('error');
  //       }
  //     }
  //   );
  // }
}
