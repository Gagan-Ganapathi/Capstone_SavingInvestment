import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.isSuccess) {
             localStorage.setItem('userid', response.result.user.email);
             localStorage.setItem('token', response.result.token);
             localStorage.setItem('role', response.result.role);

             if(response.result.role !== 'admin' && response.result.user.email !== 'admin123@gmail.com'){           
               this.router.navigate(['/income']);
            }
            else
            {this.router.navigate(['/dashboard']);
          }

          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
}

// localStorage.setItem('currentUser', this.loginForm.get('userName')?.value);
          
//           // Check username and navigate accordingly
//           if (this.loginForm.get('userName')?.value === 'nitheshs938@gmail.com') {
//             this.router.navigate(['/dashboard']);
//           } else {
//             this.router.navigate(['/employees']);
//           }

