 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { Event } from '../model/resource';
import { Resource } from '../model/resource';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

interface EventData {
  events: Event[];
  resources: Resource[];
 }
@Component({
  selector: 'app-search-retreive',
  imports: [CommonModule,MatCardModule,MatListModule,MatTableModule,MatIcon,MatPaginator],
  templateUrl: './search-retreive.html',
  styleUrl: './search-retreive.css'
})
export class SearchRetreive {
 eventId: string | null = null;
   resourceColumns: string[] = ['resource_Id', 'file_Path', 'file_Type', 'status', 'views', 'uploaded_date'];
  eventData: EventData | null = null;

 
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

 
ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.loadEvent(this.eventId);
    }
  }

  loadEvent(id: string) {
    const numericId = Number(id);
    this.http.get<EventData>(`http://localhost:5000/api/Supervisor/GetById?ID=${numericId}`).subscribe(
      data => {
        this.eventData = data;
        console.log(this.eventData);
      },
      error => {
        console.error('Error loading event:', error);
        this.eventData = null;
      }
    );
  }
  downloadFile(fileName: string) {
    const encodedFileName = encodeURIComponent(fileName);
    const fileUrl = `http://localhost:5000/api/File/view/${encodedFileName}`;
    window.open(fileUrl, '_blank');
  }
}