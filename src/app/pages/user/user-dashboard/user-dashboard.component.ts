import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../admin/sidebar/sidebar.component';
import { TeacherSidebarComponent } from "../teacher-sidebar/teacher-sidebar.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  imports: [MatListModule, SidebarComponent, SidebarComponent, RouterModule, RouterOutlet, TeacherSidebarComponent]
})
export class UserDashboardComponent {

}
