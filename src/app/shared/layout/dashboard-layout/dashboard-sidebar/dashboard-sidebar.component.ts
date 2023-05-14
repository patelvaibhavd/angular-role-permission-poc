import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_VARIABLES } from 'src/app/core/constants/storage.constant';
import { Role } from 'src/app/core/interfaces/role.enum';
import { StorageService } from 'src/app/core/services';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  userDetails: any;
  menuList = [];

  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.userDetails = this._storageService.getItem(STORAGE_VARIABLES.USER_DETAILS);
    if (this.userDetails.role === Role['USER']) {
      this.menuList.push({
        name: 'Stories',
        icon: '',
        routerLink: '/stories'
      })
    } else if (this.userDetails.role === Role['SUPER_ADMIN']) {
      this.menuList.push({
        name: 'Dashboard',
        icon: 'fa fa-tachometer',
        routerLink: '/dashboard'
      }, {
        name: 'Stories',
        icon: 'fa fa-book',
        routerLink: '/stories'
      })
    }
  }

  goToRepo() {
    (<any>window).open('https://github.com/patelvaibhavd/angular-role-permission-poc', '_blank');
  }

  logout() {
    this._storageService.clearAll();
    this._router.navigate(['/auth/login']);
  }

}
