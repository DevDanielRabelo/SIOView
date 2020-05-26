import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Product } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';
import { ShippingCompanyService } from 'src/app/services/shipping_company.service';
import { ShippingCompany } from 'src/app/models/shipping_company.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  listPordutos: Product[] = new Array<Product>()
  listTransportadora: ShippingCompany[] = new Array<ShippingCompany>()
  productSelect: Product = new Product

  nomeFormControl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  lotelFormControl: FormControl = new FormControl('', [
    Validators.required
  ]);

  main_dataFormGroup = new FormGroup({
    url: this.nomeFormControl,
    email: this.lotelFormControl,
  }, [Validators.required])

  pesoFormControl = new FormControl(null);
  tipoFormControl = new FormControl(null);

  complementoFormGroup = new FormGroup({
    peso: this.pesoFormControl,
    tipo: this.tipoFormControl
  })

  ShippingCompanyControl = new FormControl(0);
  nameCompanyControl = new FormControl(null, [Validators.required]);
  invoiceControl = new FormControl(null, [Validators.required]);

  retiradaFrom = new FormGroup({
    shipping_company: this.ShippingCompanyControl,
    _id: new FormControl(),
    invoice: this.invoiceControl
  }, [Validators.required])

  matcher = new MyErrorStateMatcher();



  constructor(
    public dialog: MatDialog,
    private serviceProduct: ProductService,
    private transportadoraService: ShippingCompanyService
  ) { }

  ngOnInit() {
    this.transportadoraService.list().subscribe(data => {
      this.listTransportadora = data
    })
    this.getList()
  }

  openDialog(modal, product?: Product) {
    const dialogRef = this.dialog.open(modal);

    if(product){
      this.productSelect = product
      this.retiradaFrom.controls._id.patchValue(product._id)
    }
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  Submit() {
    let FormSend = new FormGroup({
      name: this.nomeFormControl,
      peso: this.pesoFormControl,
      tipo: this.tipoFormControl,
      lote: this.lotelFormControl
    })

    if(this.ShippingCompanyControl.value){
      this.serviceProduct.update(this.retiradaFrom.value).subscribe(
        (data) => {
          this.getList()
        },
        (error) => {
          console.log(error)
        }
      )
    }
    else{
      this.serviceProduct.create(FormSend.value).subscribe(
        (data) => {
          this.getList()
        },
        (error) => {
          console.log(error)
        }
      )
    }

 
  }

  getList() {
    this.listPordutos = null
    this.serviceProduct.list().subscribe(data => {
      this.listPordutos = data
    })
  }
}
