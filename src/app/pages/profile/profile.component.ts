import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  constructor(private login: LoginService) {

  }
  ngOnInit(): void {
    this.user = this.login.getUser();
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
}
