// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finance-tracker';
  isSidebarCollapsed = false;
  constructor(private authService: AuthService) {}

  // Getter to check authentication status
  get isAuthenticated(): boolean {
    //console.log(this.isAdmin);
    //console.log(this.isAuthenticated);
    return this.authService.getAuthStatus();

  }
  get isAdmin(): boolean {
   return this.authService.getAdminStatus();
  }
}