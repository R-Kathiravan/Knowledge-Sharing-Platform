import { CommonModule } from '@angular/common';
import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule, Routes } from '@angular/router';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatListModule } from '@angular/material/list';
 import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
 import { RetreiveDataDashborad } from '../retreive-data-dashborad/retreive-data-dashborad';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../services/user.service';
const MODULES = [CommonModule,MatMenuModule,ReactiveFormsModule,FormsModule, MatFormFieldModule,HttpClientModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule, MatDividerModule, MatGridListModule,MatListModule];

@Component({
  selector: 'app-faculty-dashborad-header',
  imports: [MODULES,MatChipsModule,RetreiveDataDashborad, RouterModule],
  templateUrl: './faculty-dashborad-header.html',
  styleUrl: './faculty-dashborad-header.css'
})
export class FacultyDashboradHeader {
private authService = inject(AuthGoogleService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private userService = inject(UserService);

  profile = this.authService.profile;
  resources = signal<any[]>([]);
  selectedResourceUrl = signal<string | null>(null);
  userRole = this.userService.getRole();

 
  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  onSearchClick() {
    this.router.navigate(['/resource-search']);
  }

  openResourceFile(url: string) {
    this.selectedResourceUrl.set(url);
  }

  closeResourcePopup() {
    this.selectedResourceUrl.set(null);
  }
  searchText: string = '';
  results: any[] = [];
  timeout: any;

  onSearch() {
    clearTimeout(this.timeout);  
    this.timeout = setTimeout(() => {
      if (this.searchText && this.searchText.length > 2) {
        this.http.get<any[]>(`http://localhost:5000/api/Resources/Search?keyword=${this.searchText}`)
          .subscribe(data => {
                console.log('Search results:', data);  // Add this
this.results = data});
      } else {
        this.results = [];
      }
    }, 300);  
  }
  
navigateSearch(event_id: number | undefined) {
    console.log('Clicked event_id:', event_id);
  if (event_id !== undefined && event_id !== null) {
this.router.navigate(['/faculty/search-retreive', event_id]);
  } else {
    console.error('Invalid eventID passed to navigateSearch:', event_id);
  }
}

}
