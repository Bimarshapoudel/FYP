import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [MatListModule, SidebarComponent, SidebarComponent, RouterModule, RouterOutlet]
})
export class DashboardComponent {

}
