import { ShippingCompany } from './shipping_company.model'

export class Product {
    //id
    _id: String
    //nome
    name: String
    //tipo
    tipo: String
    //peso do item
    peso: Number
    //lote do item
    lote: String
    //imagen
    images: String
    //transportadora
    shipping_company:ShippingCompany
    //data de retirada
    data_withdrawal: Date
    //nota fiscal
    invoice: String
    // Retirada
    withdrawal: boolean
}