import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './_base.service';
import { User } from '../models/user.model';


@Injectable()
export class UserService extends BaseService<User> {

    constructor(protected http: Http) {
        super('usuarios');
    }

    login(user: User) {
        try {
            const body = JSON.stringify(user);
            const headerOptions = new Headers({ 'Content-Type': 'application/json' });
            const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
            return this.http.post(this.ApiUrl + 'usuarios/login', body, requestOptions).map(x => x.json()
                , catchError(this.handleError));

        } catch (error) {
            return Observable.throw(error);
        }
    }

    token(user: User) {
        try {
            const body = JSON.stringify(user);
            const headerOptions = new Headers({ 'Content-Type': 'application/json' });
            const requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
            return this.http.put(this.ApiUrl + 'usuarios/token', body, requestOptions).map(x => x.json()
                , catchError(this.handleError));

        } catch (error) {
            return Observable.throw(error);
        }
    }
}