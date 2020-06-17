import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './_base.service';
import { User } from '../models/user.model';

@Injectable()
export class EmployeesService extends BaseService<User> {

    constructor(protected http: Http) {
        super('usuarios');
    }

}