import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from 'src/app/services/product.service';
import { ShippingCompany } from 'src/app/models/shipping_company.model';
import { ShippingCompanyService } from 'src/app/services/shipping_company.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-shipping-company',
  templateUrl: './shipping-company.component.html',
  styleUrls: ['./shipping-company.component.css']
})
export class ShippingCompanyComponent implements OnInit {

  nomeFormControl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  razaoFormControl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  _idFormControl: FormControl = new FormControl(null);


  main_dataFormGroup = new FormGroup({
    name: this.nomeFormControl,
    razao_social: this.razaoFormControl,
  }, [Validators.required])

  cnpjFormControl = new FormControl(null);

  complementoFormGroup = new FormGroup({
    cnpj: this.cnpjFormControl
  }, [Validators.required])


  matcher = new MyErrorStateMatcher();

  listTransportadora: ShippingCompany[] = new Array<ShippingCompany>()

  transportadoraSelect: ShippingCompany = new ShippingCompany

  constructor(
    public dialog: MatDialog,
    private serviceTransportadora: ShippingCompanyService
  ) { }

  ngOnInit() {
    this.getList()
  }

  openDialog(modal, transportadora?: ShippingCompany) {

    this.dialog.open(modal);

    if (transportadora) {
      this.transportadoraSelect = transportadora
      this._idFormControl.patchValue(this.transportadoraSelect._id)
      this.nomeFormControl.patchValue(this.transportadoraSelect.name)
      this.razaoFormControl.patchValue(this.transportadoraSelect.social_reason)
      this.cnpjFormControl.patchValue(this.transportadoraSelect.CNPJ)
    }
  }

  closeDialog() {
    this.dialog.closeAll()
    this.transportadoraSelect = new ShippingCompany
  }

  Submit() {

    let FormSend = new FormGroup({
      _id: this._idFormControl,
      name: this.nomeFormControl,
      social_reason: this.razaoFormControl,
      CNPJ: this.cnpjFormControl
    })

    if (!this.cnpjFormControl.hasError('required')) {
      if (FormSend.value._id) {
        this.serviceTransportadora.update(FormSend.value).subscribe(
          (data) => {
            this.getList()
          },
          (error) => {
            console.log(error)
          }
        )
      } else {
        this.serviceTransportadora.create(FormSend.value).subscribe(
          (data) => {
            this.getList()
          },
          (error) => {
            console.log(error)
          }
        )
      }
    }
    this._idFormControl.patchValue('')
    this.nomeFormControl.patchValue('')
    this.razaoFormControl.patchValue('')
    this.cnpjFormControl.patchValue('')
  }

  delet() {
    this.serviceTransportadora.delet(this.transportadoraSelect._id).subscribe(
      (data) => {
        this.getList()
        this.closeDialog()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getList() {
    this.listTransportadora = null
    this.serviceTransportadora.list().subscribe(data => {
      this.listTransportadora = data
    })
  }
}
