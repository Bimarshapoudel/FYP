import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, MatSnackBarModule, MatCardModule,
    ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private userService: UserService, private snack: MatSnackBar, private fb: FormBuilder
    , private router: Router) {

  }
  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.pattern(/^\d{10}$/)]]
    }, { validator: this.passwordMatchValidator })
  };

  private passwordMatchValidator(fg: FormGroup): void {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      fg.get("confirmPassword")?.setErrors({ passwordMismatch: true })
    }
    else {
      fg.get('confirmPAssword')?.setErrors(null);
    }
  }
  formSubmit() {
    this.userService.addUser(this.signupForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res != null) {
          Swal.fire('Success', 'User success registered', 'success');
          this.router.navigateByUrl("/login")
        }
        else {
          alert('error');
        }

      })
    // if (this.signupForm.username == '' || this.user.username == null) {
    //   // alert('user is required')
    //   this.snack.open('Username is required', '', {
    //     duration: 3000,
    //     verticalPosition: 'top',
    //     horizontalPosition: 'right'
    //   });
    //   return;
    // }
    // //addUser from UserService
    // this.userService.addUser(this.user).subscribe({
    //   next: (data) => {
    //     //succes
    //     console.log(data);
    //     // alert('success');
    //     Swal.fire('Success', 'User success registered', 'success');
    //   },
    //   error: (error) => {
    //     //error
    //     console.log(error);
    //     // alert('error');
    //     this.snack.open('something went wrong !!!', '', {
    //       duration: 3000,
    //       verticalPosition: 'top',
    //       horizontalPosition: 'right'
    //     });
    //   }
    // });
  }


}
