import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../../config/appConfig';
import { HttpService } from '../../../../commons/services/http.service';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import { Constants } from '../../../../../config/constant';
import {
  Http, Headers, ConnectionBackend, Response, RequestOptionsArgs,
  Request, RequestOptions, ResponseContentType
} from '@angular/http';
@Injectable()
export class AdminService {
    private isUserLoggedIn;
    private userName;
    public constants = Constants;
    public trialId: any;
    public _id: any;
    constructor(private _http: HttpService, private router: Router, private http:Http) {
    }
    getProdctList() {
            return this._http.get(`${AppConfig.baseUrl}/api/products`).map(response => response.json());
    }
    getUsersList() {
      return this._http.get(`${AppConfig.baseUrl}/api/users`).map(response => response.json());

    }
    editUser(phone, userInputObj) {
      const headers = new Headers();
      headers.append('mimeType', 'multipart/form-data');
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${AppConfig.baseUrl}/api/${phone}/users`, userInputObj).map(response => response.json());
    }
    editProduct(phone, userInputObj) {
      const headers = new Headers();
      headers.append('mimeType', 'multipart/form-data');
      const options = new RequestOptions({ headers: headers });
      return this.http.put(`${AppConfig.baseUrl}/api/${phone}/product`, userInputObj).map(response => response.json());
    }
    saveUsers(objData) {
      const headers = new Headers();
      headers.append('mimeType', 'multipart/form-data');
      const options = new RequestOptions({ headers: headers });
        return this.http.post(`${AppConfig.baseUrl}/api/users/register`, objData, options).map(response => response.json());
    }
    deleteUser(userId) {
        return this._http.delete(`${AppConfig.baseUrl}/api/${userId}/users`).map(response => response.json());
  
    }

    approveUser(phone, userInputObj) {
      return this.http.put(`${AppConfig.baseUrl}/api/${phone}/users?isValidated=true`, userInputObj).map(response => response.json());
    }
}
