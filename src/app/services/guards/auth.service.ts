import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.prod';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

  validUser = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    // private toastr: ToastrService
  ) { }

  fazerLogin(usuario?: User) {

    if (usuario) {

      this.usuarioAutenticado = true;

      window.localStorage.setItem('user', JSON.stringify(usuario))

      this.accessTrue();

      this.validUser.emit(true)

      this.router.navigate(['/']);

    }
    else {
      this.usuarioAutenticado = false;
      this.validUser.emit(false);
    }
  }

  usuarioEstaAutenticado() {
    if (!environment.user._id) {
      if (window.localStorage.getItem('user')) {
        let user: User = JSON.parse(window.localStorage.getItem('user'))

        if (user.main_data.last_access) {

          let date = new Date().toISOString()
          // if (parseInt(last_access[0]) === dia && parseInt(last_access[1]) === mes && parseInt(last_access_time[0]) === ano) {
          //   if (!(hora <= 6)) {
          //     this.accessFalse('Sessão encerrada')
          //   }
          //   else if (!(minuto >= parseInt(last_access_horas[1]))) {
          //     this.accessFalse('Sessão encerrada')
          //   }
          //   else {

          this.accessTrue();
          this.validUser.emit(true)

          //   }
          // }
          // else if((parseInt(last_access[0]) - dia) == 1){}
          // else {
          //   this.accessFalse('Sessão encerrada')
          // }
        }
        else {
          this.accessFalse('Faça o login')
        }
      }
    } else {
      this.accessTrue();
    }

    return this.usuarioAutenticado;

  }

  accessFalse(motivo: string) {
    window.localStorage.removeItem('user')
    // this.toastr.error('Acesso negado', motivo);
    this.usuarioAutenticado = false;
  }

  accessTrue() {
    environment.user = JSON.parse(window.localStorage.getItem('user'))
    this.usuarioAutenticado = true;
  }

}
