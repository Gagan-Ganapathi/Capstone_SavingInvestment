import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { NgModel } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
//import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink,LoginComponent,RegisterComponent,DashboardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  // router = inject(Router);
  // role = localStorage.getItem("role");
}