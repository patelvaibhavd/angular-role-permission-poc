import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _http: HttpClient
  ) { }

  encode(value) {
    return btoa(value);
  }

  decode(value) {
    return atob(value);
  }

  transformToSnakeCase(data) {
    let newData;

    if (data instanceof File || data instanceof FormData) { // file object -> transformation is not needed
      newData = data;
    } else {
      if (data && _.isObject(data) && !Array.isArray(data)) { // object
        newData = {};
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const newKey = _.snakeCase(key);
            newData[newKey] = data[key];
            if (data[key] && _.isObject(data[key]) && !Array.isArray(data[key])) { // object
              newData[newKey] = this.transformToSnakeCase(data[key]);
            } else if (data[key] && Array.isArray(data[key])) { // array
              newData[newKey] = this.transformToSnakeCase(data[key]);
            }
          }
        }
      } else if (data && _.isObject(data) && Array.isArray(data)) { // array
        newData = [];
        for (const value of data) {
          if (_.isObject(value) || Array.isArray(value)) { // array or object
            newData.push(this.transformToSnakeCase(value));
          } else { // any value except array and object
            newData.push(value);
          }
        }
      }
    }
    return newData;
  }

  transformToCamelCase(data) {
    let newData;
    if (data && _.isObject(data) && !Array.isArray(data)) { // object
      newData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const newKey = _.camelCase(key);
          newData[newKey] = data[key];
          if (data[key] && _.isObject(data[key]) && !Array.isArray(data[key])) { // object
            newData[newKey] = this.transformToCamelCase(data[key]);
          } else if (data[key] && Array.isArray(data[key])) { // array
            newData[newKey] = this.transformToCamelCase(data[key]);
          }
        }
      }
    } else if (data && _.isObject(data) && Array.isArray(data)) { // array
      newData = [];
      for (const value of data) {
        if (_.isObject(value) || Array.isArray(value)) { // array or object
          newData.push(this.transformToCamelCase(value));
        } else { // any value except array and object
          newData.push(value);
        }
      }
    }
    return newData;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
