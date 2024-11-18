// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { map } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// export const authGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.currentUser$.pipe(
//     map(user => {
//       if (user) {
//         return true;
//       }
//       router.navigate(['/login']);
//       return false;
//     })
//   );
// };


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthStatus()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login
      return false;
    }
  }
}
