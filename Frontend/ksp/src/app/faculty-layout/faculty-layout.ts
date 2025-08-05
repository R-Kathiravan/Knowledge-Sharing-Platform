import { Component } from '@angular/core';
import { FacultyDashboradHeader } from '../faculty-dashborad-header/faculty-dashborad-header';
import { RetreiveDataDashborad } from '../retreive-data-dashborad/retreive-data-dashborad';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-faculty-layout',
  imports: [FacultyDashboradHeader,RetreiveDataDashborad,RouterOutlet],
  templateUrl: './faculty-layout.html',
  styleUrl: './faculty-layout.css'
})
export class FacultyLayout {

}
