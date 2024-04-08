import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { availableLanguages, sysOptions } from '../../home/home.constants';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';
import { DOCUMENT } from '@angular/common';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  Highcharts = Highcharts;

  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;
  private translate: TranslateService;
  user$: Login = null;
  elem;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, translate: TranslateService, private authService: AuthService) {
    this.translate = translate;
    let lingua = localStorage.getItem('language')
    if(!lingua){
      this.translate.use(this.selectedLanguage)
      localStorage.setItem('language','en')
    }
  }

  ngOnInit() {
    this.elem = document.documentElement;
  }

  isLoggedin(): boolean {
    this.user$ = this.authService.isLoggedin()
    this.translate.use(localStorage.getItem('language'))
    if (this.user$) return true;
  }

  logoff() {
    localStorage.setItem('language', 'en')
    this.authService.removeUser()
    this.user$ = undefined   
    this.router.navigate(['/Login'])
  }

  Login() {
    this.router.navigate(['/Login'])
  }

  mudarIngles() {
    this.translate.use('en');
    localStorage.removeItem('language')
    localStorage.setItem('language', 'en');
  }

  mudarEspanhol() {
    this.translate.use('es');
    localStorage.removeItem('language')
    localStorage.setItem('language', 'es');
  }

  mudarPortugues() {
    this.translate.use('pt')
    localStorage.removeItem('language')
    localStorage.setItem('language', 'pt');
  }

  fullscream(){
    if ( this.elem.requestFullscreen ) 
    {
      this.elem.requestFullscreen();
    } 
    else if ( this.elem.mozRequestFullScreen ) 
    {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } 
    else if ( this.elem.webkitRequestFullscreen ) 
    {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } 
    else if ( this.elem.msRequestFullscreen ) 
    {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }

    if ( this.document.exitFullscreen ) 
    {
      this.document.exitFullscreen();
    } 
    else if ( this.document.mozCancelFullScreen ) 
    {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } 
    else if ( this.document.webkitExitFullscreen ) 
    {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } 
    else if ( this.document.msExitFullscreen ) 
    {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  ModificarSenha(){
    this.router.navigateByUrl('/GerenciarSenha');
  }
}
