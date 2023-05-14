import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _apiService: ApiService,
    private _jwtService: JwtService
  ) { }

  login(params) {
    const url = `${API_ENDPOINTS.LOGIN}`;
    return this._apiService.post(url, params);
  }

  reginster(params) {
    const url = `${API_ENDPOINTS.REGISTER}`;
    return this._apiService.post(url, params);
  }

  isLoggednIn() {
    if (this._jwtService.getToken()) {
      return true;
    } else {
      return false;
    }
  }
}
