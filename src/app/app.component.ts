import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/guards/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private title = 'sio';
  private logged: boolean = false
  private user: User
  private isMenuOpen: boolean = true;
  private contentMargin: number = 240;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit() {
    this.authService.validUser.subscribe(user => { 
      this.logged = user

      if(user){
        // this.toastr.success('Seja muito bem vindo!', 'Olá ' + environment.user.main_data.name + '!')
        this.user = environment.user
      }
    })
  }

  logoff() {
    window.localStorage.removeItem('user')
    this.logged = false
    this.router.navigate(['login']);
    // this.toastr.info('Espero que você volte!', 'Adeus ' + environment.user.main_data.name + '!')
    environment.user = null
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

}
