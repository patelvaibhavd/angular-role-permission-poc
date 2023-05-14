import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { SimpleLayoutComponent } from './layout/simple-layout/simple-layout.component';
import { DashboardSidebarComponent } from './layout/dashboard-layout/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './layout/dashboard-layout/dashboard-header/dashboard-header.component';
import { LoaderComponent } from './common-component/loader/loader.component';
import { DeleteConfirmationComponent } from './common-component/modal/delete-confirmation/delete-confirmation.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    SimpleLayoutComponent,
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    LoaderComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
