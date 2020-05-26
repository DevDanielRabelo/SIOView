import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/guards/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  text = 'Entrar'

  constructor(
    private serviceUser: UserService,
    private fb: FormBuilder,
    // private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  user: User;


  onSubmit(data: FormGroup) {
    this.text = 'Entrando...'
    this.serviceUser.login(data.value).subscribe(
      (data) => {
        this.authService.fazerLogin(data);
        this.text = 'Entrar'
      },
      (err) => { 
        let mensage = JSON.parse(err._body)
        // this.toastr.error(mensage.massage, 'Nao Deu!');
        this.text = 'Entrar'
      }
    )
  }

}
