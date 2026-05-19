import { Routes } from '@angular/router';
import { LoginMain } from './component/login/login.main';
import { Main } from './component/main/main';
import { Dashboard } from './component/dashboard/dashboard';
import { Employeelist } from './component/employeelist/employeelist';

export const routes: Routes = [
     { path: 'login', component: LoginMain },

  {
    path: 'main',
    component: Main,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'employees', component: Employeelist },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }
  
];
