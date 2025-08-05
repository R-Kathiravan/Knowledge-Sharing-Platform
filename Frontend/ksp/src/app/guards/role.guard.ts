import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[] | undefined;
    const userRole = this.userService.getRole();

    if (userRole && allowedRoles && allowedRoles.includes(userRole)) {
      return true;
    } else {
       this.router.navigate(['']);
      return false;
    }
  }
}
