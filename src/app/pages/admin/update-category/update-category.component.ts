import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  cid = undefined;
  category: any;
  constructor(private _router: Router, private _route: ActivatedRoute, private _cat: CategoryService) { }

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];

    this._cat.getCategory(this.cid).subscribe({
      next: (data: any) => {
        this.category = data
      },
      error: (error: any) => {
        alert('error')
      }
    })
  }

  public updateData() {
    this._cat.updateCategory(this.category).subscribe({
      next: (data: any) => {
        Swal.fire('Update', 'Category updated', 'success').then((e) => {
          this._router.navigate(['/admin/categories'])
        });
      }, error: (error) => {
        Swal.fire('Error', 'Error in updating', 'error');
      }
    })

  }

}
