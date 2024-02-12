import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: UserService, private snack: MatSnackBar) {

  }
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }
  formSubmit() {

    if (this.user.username == '' || this.user.username == null) {
      // alert('user is required')
      this.snack.open('Username is required', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
    //addUser from UserService
    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        //succes
        console.log(data);
        // alert('success');
        Swal.fire('Success', 'User success registered', 'success');
      },
      error: (error) => {
        //error
        console.log(error);
        // alert('error');
        this.snack.open('something went wrong !!!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }


}
