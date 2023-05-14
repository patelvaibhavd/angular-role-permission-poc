import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';

import { Role } from '../interfaces/role.enum';
import { roles } from '../constants/roles.constant';
import { STORAGE_VARIABLES } from '../constants/storage.constant';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _storageService: StorageService
    ) { }


    // Role check with route path 
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const roleName = this._storageService.getItem(STORAGE_VARIABLES.USER_DETAILS).role;
        const userTypeName = Role[roleName];
        if (userTypeName) {
            const routes = roles[userTypeName];
            for (let i = 0, len = routes.length; i < len; i++) {
                if (state.url.indexOf(routes[i]) > -1) {
                    return true;
                }
            }
            if (userTypeName === 'USER') {
                this._router.navigate(['/stories']);
            } else {
                this._router.navigate(['/dashboard']);
            }
            return false;
        }
        return false;
    }
}

