import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../admin/sidebar/sidebar.component';
import { StudentSidebarComponent } from "../../student-sidebar/student-sidebar.component";

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  imports: [MatListModule, SidebarComponent, SidebarComponent, RouterModule, RouterOutlet, StudentSidebarComponent]
})
export class StudentComponent {

}
