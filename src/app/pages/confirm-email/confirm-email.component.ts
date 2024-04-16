import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CodeInputModule } from 'angular-code-input';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CodeInputModule, CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent {

  message = '';
  isOKay = true;
  submitted = false;

  constructor(private router: Router, private _service: UserService) {

  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
    console.log(token)
  }
  redirecttoLogin() {
    this.router.navigate(['login'])
  }
  private confirmAccount(token: string) {
    console.log(token)
    this._service.activateAccount(token).subscribe({

      next: (data) => {
        this.message = "Your Account has been successfully Activated.\n Now you can procedd to login";
        this.submitted = true
      },
      error: (error) => {
        this.message = "Token has been expired or invalid";
        this.submitted = true;
        this.isOKay = false;
      }
    })
  }
}
