import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  show:boolean = false;
  collapseGerenciamento: string = 'closed';
  collapseCadastro: string = 'closed';
  collapseAnalise: string = 'closed';
  collapseRelatorio: string = 'closed';
  collapseGraficos: string = 'closed';
  isLogin: Login = undefined;
  idUsuario: number;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  isLoggedin(): boolean{
    if(this.authService.isLoggedin()) return true;
  }

  acaoSidebar(){
    this.show == false? this.show = true: this.show = false;
  }

  
}
