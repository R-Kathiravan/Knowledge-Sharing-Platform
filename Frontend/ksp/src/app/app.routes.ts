import { Routes } from '@angular/router';
import path from 'node:path';
import { Login } from './login/login';
 import { ResourceUpload } from './resource-upload/resource-upload';
  import { SupervisorApproval } from './supervisor/supervisor-approval';
import { RetreiveDataDashborad } from './retreive-data-dashborad/retreive-data-dashborad';
import { SearchRetreive } from './search-retreive/search-retreive';
import { RoleGuard } from './guards/role.guard';
// import { FacultyDashboard } from './faculty-dashboard/faculty-dashboard';
import { FacultyLayout } from './faculty-layout/faculty-layout';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'faculty',
        component: FacultyLayout,
        canActivate: [RoleGuard],
        data: { roles: ['faculty'] },
         children: [
        { path: '', component: RetreiveDataDashborad },
    //   { path: 'dashboard', component: FacultyDashboard },
      { path: 'upload-Resources', component: ResourceUpload },
      {path:'search-retreive/:id',component:SearchRetreive}
     ]
    },
    {
        path: 'supervisor-approval',
        component: SupervisorApproval,
        canActivate: [RoleGuard],
        data: { roles: ['supervisor'] }
    } 
];
