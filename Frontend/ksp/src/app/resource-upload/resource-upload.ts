import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Required for Datepicker

@Component({
  selector: 'app-resource-upload',
  imports: [FormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, CommonModule],
  templateUrl: './resource-upload.html',
  styleUrl: './resource-upload.css'
})
export class ResourceUpload {
  event = {
    title: '',
    type: '',
    organized_By: '',
    start_Date: '',
    end_Date: '',
    keywords: '',
    status: 'pending'
  };

  // fileType = '';
  // selectedFile: File | null = null;
  createdEventId: number | null = null;
  eventCreated = false;
  // status = 'pending';
  // uploaded_date = Date().toLocaleString();

  constructor(private http: HttpClient, private router:Router) { }

  submit() {
    this.http.post<any>('http://localhost:5000/api/Events/SubmitEvent', this.event).subscribe({
      next: res => {
        this.createdEventId = res.eventId;
        this.eventCreated = true;
        alert('Event created successfully!');
        console.log(this.createdEventId);
      },
      error: err => {
        console.error(err);
        alert('Failed to create event');
      }
    });
  }

  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

    //   const formData = new FormData();
    //   formData.append('File', this.selectedFile); 
    // formData.append('File_Type', this.fileType);  
    // formData.append('Event_Id', this.createdEventId.toString());
    // formData.append('status',this.status);
    // formData.append('uploaded_date',this.uploaded_date);

//     resources = {
//       File:this.selectedFile,
//       File_Type: '',
//       event_id: this.createdEventId?.toString(),
//       status: 'pending',
//       uploaded_at: new Date().toISOString(),

//     }
//     upload(){
//       if (!this.createdEventId || !this.selectedFile) {
//       alert('Missing event or file.');
//       }
//       else {
//     this.http.post('http://localhost:5000/api/Resources/UploadResource', this.resources).subscribe({
//       next: () => alert('File uploaded successfully!'),
//       error: err => {
//         console.error(err);
//         alert('Upload failed.');
//       }
//     });
//   }
// }
resources = {
  File_Type: '',
  event_id: '',
  Status: 'pending',
  uploaded_at: new Date().toISOString()
};
selectedFile: File | null = null;
fileTypes = ['pdf', 'docx', 'pptx', 'xlsx', 'jpg', 'png', 'mp4', 'zip'];

onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

upload() {
  if (!this.createdEventId || !this.selectedFile) {
    alert('Missing event or file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('file_Type', this.resources.File_Type);
  formData.append('event_id', this.createdEventId.toString());
  formData.append('Status', 'pending');
  formData.append('uploaded_at', new Date().toISOString());

  this.http.post('http://localhost:5000/api/Resources/UploadResource', formData).subscribe({
    next: () => {alert('File uploaded successfully!');
    this.router.navigate(['/faculty']);
    },
    error: err => {
      console.error(err);
      alert('Upload failed.');
    }
  });
}


}
