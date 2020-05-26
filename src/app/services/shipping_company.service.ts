import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './_base.service';
import { ShippingCompany } from '../models/shipping_company.model'

@Injectable()
export class ShippingCompanyService extends BaseService<ShippingCompany> {

    constructor(protected http: Http) {
        super('shippingCompany');
    }

}