import { Component,computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  inject, signal, effect, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
 import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
   import { PageEvent } from '@angular/material/paginator';
import { Resource } from '../model/resource';
import { Event } from '../model/resource';
import { MatPaginator } from '@angular/material/paginator';
const MODULES = [MatPaginator,ReactiveFormsModule,CommonModule,FormsModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule, MatDividerModule, MatGridListModule,MatListModule];
interface ApiResponse {
  resources: any[];  
  events: Event[];   
}
@Component({
  selector: 'app-retreive-data-dashborad',
  imports: [MODULES],
  templateUrl: './retreive-data-dashborad.html',
  styleUrl: './retreive-data-dashborad.css'
})
export class RetreiveDataDashborad {
 private http = inject(HttpClient);

   allResources = signal<any[]>([]);

   pageSize = signal(4);
  pageIndex = signal(0);
  pageSizeOptions = signal([4, 8, 16]);
  length = computed(() => this.allResources().length);

   pagedResources = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.allResources().slice(startIndex, endIndex);
  });

  constructor() { }

  ngOnInit(): void {
    this.fetchResources();
  }

  fetchResources() {
     this.http.get<ApiResponse>('http://localhost:5000/api/Events/SelectRes').subscribe({
      next: (data) => {
        const { resources, events } = data;  

        if (Array.isArray(resources) && Array.isArray(events)) {
           const activatedResources = resources.filter((res: any) => res.status === 'activated');

           const mergedResources: Resource[] = activatedResources.map((res: any) => {
             
            const matchingEvent = events.find((e: Event) => e.event_id === res.event_Id) ?? null;

             return {
    ...res,           
    event: matchingEvent  
  };
          });

          this.allResources.set(mergedResources);
          console.log('Merged Activated Resources (all):', this.allResources());
          this.pageIndex.set(0);  
        }
      },
      error: (err) => console.error('API Error:', err)
    });
  }


   onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
 
    console.log(`Paginator changed to Page: ${this.pageIndex()}, Size: ${this.pageSize()}`);
  }

  viewFile(filePath: string) {
    const fullPath = `http://localhost:5000/api/File/view/${encodeURIComponent(filePath)}`;
    window.open(fullPath);
  }
}
