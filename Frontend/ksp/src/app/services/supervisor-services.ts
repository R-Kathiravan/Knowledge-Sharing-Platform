import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event,Resource} from '../model/resource';  
 
@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
 
  private baseUrl = 'http://localhost:5000/api/Supervisor';

 getPendingEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/PendingEvents`);
  }

  getPendingResources(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/PendingResources`);
  }

  constructor(private http: HttpClient) {}

  approveEvent(eventId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/ApproveEvent/${eventId}`, { event_id: eventId });
  }

  rejectEvent(eventId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/RejectEvent`, { event_id: eventId });
  }

  approveResources(resourceIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/ApproveResources/${resourceIds}`, resourceIds);
  }

  rejectResources(resourceIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/RejectResources`, resourceIds);
  }
  approveEventandResources(eventId:number){
    return this.http.post(`${this.baseUrl}/ApproveEventAndResources/${eventId}`, {event_id: eventId});
  }
  rejectEventandResources(eventID:number){
    return this.http.post(`${this.baseUrl}/RejectEventAndResources/${eventID}`, {event_id: eventID});
  }
  getApprovedEvent(): Observable<any[]> {
  return this.http.get<Event[]>("http://localhost:5000/api/Events/GetApprovedEvents");
}
  getApprovedResources(){
    return this.http.get<Resource[]>(`http://localhost:5000/api/Resources/GetApprovedResources`);
  }
  getRejectedResources(){
    return this.http.get<Resource[]>(`http://localhost:5000/api/Resources/GetRejectedResources`);
  }
 
  getRejectedEvent(){
    return this.http.get<Event[]>(`http://localhost:5000/api/Events/GetRejectedEvents`);
  }

}
