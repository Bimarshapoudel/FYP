import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatListModule, MatCardModule, MatIcon, MatIconModule, RouterLink],
  templateUrl: './student-sidebar.component.html',
  styleUrl: './student-sidebar.component.css'
})
export class StudentSidebarComponent {
  categories = [{
    cid: '',
    title: '',
    description: ''
  }];

  constructor(private _cat: CategoryService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories)
      },
      error: () => {
        Swal.fire('Error', 'Error in loading categoreis', 'error')
      }
    })
  }
}
