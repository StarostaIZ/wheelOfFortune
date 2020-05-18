import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const roles = localStorage.getItem('roles');
    if (!roles || !roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
