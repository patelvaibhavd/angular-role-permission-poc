import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from './../services/jwt.service';
import { StorageService } from '../services/storage.service';
import { STORAGE_VARIABLES } from '../constants/storage.constant';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {

    constructor(
        private _jwtService: JwtService,
        private _storageService: StorageService
    ) { }

    setHeaders() {
        const token = this._jwtService.getToken();
        const userDetails = this._storageService.getItem(STORAGE_VARIABLES.USER_DETAILS);
        const params = {};
        if (token) {
            params['Authorization'] = `Bearer ${token}`;
            const headers: HttpHeaders = new HttpHeaders(params);
            return headers;
        }
        return;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({ headers: this.setHeaders() });
        return next.handle(modifiedReq);
    }
}
