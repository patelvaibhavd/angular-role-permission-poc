import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { STORAGE_VARIABLES } from '../constants/storage.constant';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private _storageService: StorageService
  ) { }

  getToken(): String {
    return this._storageService.getItem(STORAGE_VARIABLES.TOKEN);
  }

  setToken(token: String) {
    this._storageService.setItem(STORAGE_VARIABLES.TOKEN, token);
  }

  destroyToken() {
    this._storageService.removeItem(STORAGE_VARIABLES.TOKEN);
  }
}
