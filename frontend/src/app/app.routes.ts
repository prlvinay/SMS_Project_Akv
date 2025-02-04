import { Routes } from '@angular/router';
import { HomeComponent } from './features/auth/componets/home/home.component';
import { LoginComponent } from './features/auth/componets/login/login.component';
import { DashboardComponent } from './features/auth/componets/dashboard/dashboard.component';
import { LayoutComponent } from './features/auth/componets/layout/layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: "",
    component:HomeComponent,
  },
  {
    path: "login",
    component:LoginComponent,

  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard],
      }
    ]
  },
  {
    path:'register',
    loadComponent:()=> import('../app/features/auth/componets/register/register.component')
    .then((c)=>c.RegisterComponent)
  },
  {
    "path":"**",
    component:HomeComponent
  }
];
