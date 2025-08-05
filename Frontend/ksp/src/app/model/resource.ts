// src/app/models/event.model.ts
export interface Event {
  event_id: number;
  title: string;
  type: string;
  startDate: string;     // ISO string; can be Date if parsed
  endDate: string;
  organized_By: string;
  keywords: string;
  userId: number;
  status: string;
}



export interface Resource {
  resource_Id: number;
  event_Id: number;
  file_Type: string;
  file_Path: string;
  views: number;
  uploaded_at: string;
  status: string;
   event: Event; 
}
