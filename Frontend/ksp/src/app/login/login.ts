import { Component, signal, inject, effect } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports:[CommonModule,FormsModule]
})
export class Login {
  private authService = inject(AuthGoogleService);
  private userService = inject(UserService);
  private router = inject(Router);

  userProfile = this.authService.profile;
  showUserInfoPopup = signal(false);
  selectedRole = 'faculty'; // default role

  toggleUserInfoPopup() {
    this.showUserInfoPopup.set(!this.showUserInfoPopup());
  }

  closeUserInfoPopup() {
    this.showUserInfoPopup.set(false);
  }

  signInWithGoogle() {
     localStorage.setItem('selectedRole', this.selectedRole);
this.userService.setRole(this.selectedRole);
    this.authService.login();
  }

  constructor() {
    effect(() => {
      const profile = this.authService.profile();
      if (profile) {
         const storedRole = localStorage.getItem('selectedRole') || 'faculty';
        this.userService.setRole(storedRole);
        if (storedRole === 'supervisor') {
          this.router.navigate(['/supervisor-approval']);
        } else {
          this.router.navigate(['/faculty']);
        }
       }
    });
  }
  

  logout() {
    this.authService.logout();
    this.userService.clearRole();
  }
}
