import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SupervisorService } from '../services/supervisor-services';
import { MatAccordion } from '@angular/material/expansion';
import { forkJoin } from 'rxjs';
import { Event } from '../model/resource';
import { Resource } from '../model/resource';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { AuthGoogleService } from '../services/auth-google';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-supervisor-approval',
  templateUrl: './supervisor-approval.html',
  styleUrls: ['./supervisor-approval.css'],
  standalone: true,
  imports: [MatMenuModule,MatCardModule, MatTableModule, MatExpansionModule, CommonModule, MatButtonModule, MatTabsModule, MatIconModule]
})
export class SupervisorApproval {
  private http = inject(HttpClient);
  private authService = inject(AuthGoogleService);
  private userService = inject(UserService);
  userRole = this.userService.getRole();
  private router = inject(Router);

  approvedEvents = signal<any[]>([]);
  rejectedEvents = signal<any[]>([]);
  approvedResources = signal<any[]>([]);
  rejectedResources = signal<any[]>([]);
  selectedTabIndex = 0;
  events: Event[] = [];
  resources: Resource[] = [];
  profileMenuOpen = false;
  profile = this.authService.profile;

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }


  constructor(private supervisorService: SupervisorService) { }
approvedEvent: Event[] = [];
approvedResource: Resource[] = [];
rejectedEvent: Event[] = [];
rejectedResource: Resource[] = [];
 
  ngOnInit(): void {
    this.fetchData();
    this.loadApprovedData();
    this.loadRejectedData();
  }

  loadApprovedData() {
    this.supervisorService.getApprovedEvent().subscribe((res: any) => {
      this.approvedEvent = res.events || [];
      console.log("approved Event", this.approvedEvent);
    });

    this.supervisorService.getApprovedResources().subscribe((res: any) => {
      this.approvedResource = res.resources || [];
      console.log("approved Resources:", this.approvedResource);
    });
  }

  loadRejectedData() {
    this.supervisorService.getRejectedEvent().subscribe((res: any) => {
      this.rejectedEvent = res.events || [];
      console.log(this.rejectedEvent);
    });

    this.supervisorService.getRejectedResources().subscribe((res: any) => {
      this.rejectedResource = res.resources || [];
      console.log(this.rejectedResource);
    });
  }
getApprovedEvent(){
  this.supervisorService.getApprovedEvent().subscribe((res: any) => { 
    this.approvedEvent = res.events || [];
    console.log("approved Event",this.approvedEvent);
  });
}
 
  fetchData() {
    forkJoin({
      events: this.supervisorService.getPendingEvents(),
      resources: this.supervisorService.getPendingResources()
    }).subscribe((data) => {
      this.events = data.events;
      this.resources = data.resources;
      console.log("pending Events:",this.events);
      console.log("Pending Resources:",this.resources);
    });
  }

  getResourcesForEvent(eventId: number, status: string = 'pending') {
    let resourceList: Resource[] = [];
    if (status === 'pending') {
      resourceList = this.resources;
    } else if (status === 'activated') {
      resourceList = this.approvedResource;
    } else if (status === 'rejected') {
      resourceList = this.rejectedResource;
    }
    return resourceList.filter(r => r.event_Id === eventId);
  }

  openFile(fileName: string) {
    const encodedFileName = encodeURIComponent(fileName);
    const url = `http://localhost:5000/api/File/view/${encodedFileName}`;
    window.open(url);
  }


 
  getPendingEvents() {
     return this.events.filter(event => event.status === 'pending');
  }

  // getApprovedEvents() {
  //   return this.events.filter(event => event.status === 'activated');
  // }

  // getRejectedEvents() {
  //   return this.events.filter(event => event.status === 'rejected');
  // }

  getPendingResources() {
    return this.resources.filter(resource => resource.status === 'pending');
  }

  // getApprovedResources() {
  //   return this.resources.filter(resource => resource.status === 'activated');
  // }

  // getRejectedResources() {
  //   return this.resources.filter(resource => resource.status === 'rejected');
  // }

  approveAll(eventId: number) {
    const relatedResources = this.getResourcesForEvent(eventId);
    const resourceIds = relatedResources.map(r => r.resource_Id);

    forkJoin([
      this.supervisorService.approveEvent(eventId),
      this.supervisorService.approveResources(resourceIds)
    ]).subscribe(() => {
      console.log('Event and resources approved.');
      this.fetchData();
      this.selectedTabIndex = 1;
    });
  }

  rejectAll(eventId: number) {
    const relatedResources = this.getResourcesForEvent(eventId);
    const resourceIds = relatedResources.map(r => r.resource_Id);

    forkJoin([
      this.supervisorService.rejectEvent(eventId),
      this.supervisorService.rejectResources(resourceIds)
    ]).subscribe(() => {
      console.log('Event and resources rejected.');
      this.fetchData();
      this.selectedTabIndex = 2;  
    });
  }

  acceptEventResource(eventId: number) {
    console.log(eventId);
    this.supervisorService.approveEventandResources(eventId).subscribe(() => alert("Event and Resources Approved Successfully!"));
  }

  getResourcesByEventId(eventId: number) {
    return this.resources.filter(r => r.event_Id === eventId);
  }

  rejectEventResources(eventId: number) {
    console.log(eventId);
    this.supervisorService.rejectEventandResources(eventId).subscribe(() => alert("Event and Resources Rejected Successfully!"));
  }
}