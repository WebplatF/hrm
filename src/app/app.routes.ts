import { Routes } from '@angular/router';
import { LoginMain } from './component/login/login.main';
import { Main } from './component/main/main';
import { Dashboard } from './component/dashboard/dashboard';

export const routes: Routes = [
    {
    path: 'dashboard',
    component: Main,
    children: [
      {path:'',component:Dashboard},
    //   {path:'vendor-create',component:VendorCreateMain},
      
    ]
  },
    {path:'login',component:LoginMain},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',redirectTo:'login'},
];
