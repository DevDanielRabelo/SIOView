import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './_base.service';
import { Product } from '../models/product.models';
import { ShippingCompany } from '../models/shipping_company.model'


@Injectable()
export class ProductService extends BaseService<Product> {

    constructor(protected http: Http) {
        super('produtos');
    }

}