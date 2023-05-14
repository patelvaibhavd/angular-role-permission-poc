import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleLayoutComponent } from './shared/layout/simple-layout/simple-layout.component';
import { DashboardLayoutComponent } from './shared/layout/dashboard-layout/dashboard-layout.component';
import { AuthGuard, RoleGuard } from './core/guards';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'stories',
        loadChildren: () => import('./components/stories/stories.module').then(m => m.StoriesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
