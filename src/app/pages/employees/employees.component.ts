import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    private FuncionariosService: EmployeesService
  ) { }

  listFuncionarios

  ngOnInit() {
    this.FuncionariosService.list().subscribe(x => {
      this.listFuncionarios = x
    })
  }

}
