import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  category = {
    title: '',
    description: ''
  }
  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }



  formsubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required', '', {
        duration: 3000,
      });
      return;
    }
    this._category.addCategory(this.category).subscribe({
      next: (data: any) => {
        this.category.title = '',
          this.category.description = '',
          Swal.fire("Success !!", 'Category is added successfully', 'success')
      },
      error: (error: any) => {
        console.log(error)
        Swal.fire("Success !!", 'Server eeroe', 'error')
      }
    })
  }
}
