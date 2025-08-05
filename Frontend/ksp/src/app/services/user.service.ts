import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRole = signal<string | null>(null);

  setRole(role: string) {
    this.userRole.set(role);
  }

  getRole() {
    return this.userRole();
  }

  clearRole() {
    this.userRole.set(null);
  }
}
