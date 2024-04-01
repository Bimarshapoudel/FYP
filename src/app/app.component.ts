import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgxUiLoaderHttpModule, RouterOutlet, NgxUiLoaderModule, MatButtonModule, NavbarComponent]
})
export class AppComponent {
  title = 'AcademiaFrontend';
}
