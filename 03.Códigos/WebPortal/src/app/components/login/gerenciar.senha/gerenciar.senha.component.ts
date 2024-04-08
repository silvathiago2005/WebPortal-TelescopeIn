import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginTemp, usuario } from 'src/app/models/login.model';
import { UserService } from 'src/app/services/users.service';
import { changePassword } from 'src/app/models/Users.model';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-gerenciar.senha',
  templateUrl: './gerenciar.senha.component.html',
  styleUrls: ['./gerenciar.senha.component.css']
})
export class GerenciarSenhaComponent implements OnInit {
  forte: boolean = false;
  senhaErrada: boolean = false;
  usuarioSenha: string = null;
  usuarioSenha1: string = null;
  usuarioSenha2:string = null;
  loginTemp: LoginTemp = new LoginTemp();

  constructor( private Auth: AuthService, private userService: UserService,private router: Router, private notification: NotificationService ) { }

  ngOnInit() {
    this.loginTemp.UserEmail = this.Auth.getUser().Email;
    this.loginTemp.Password = this.Auth.getUser().Senha;

    this.usuarioSenha = this.Auth.getUser().Senha;
  }

  validaSenha(){
    const senha_regex = /(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/;

    this.forte = (senha_regex.test(this.usuarioSenha1))? true : false;
  }

  validarSenhasIguais(){
     this.senhaErrada = (this.usuarioSenha2 == this.usuarioSenha1)? false : true;
  }

  cancelar(){
    this.router.navigateByUrl('/');
  }

  Trocar(){
    if( !this.senhaErrada && this.forte )
    {
      var troca: changePassword = new changePassword();
      troca.idUser = this.Auth.getUser().idUsuario;
      troca.Password = this.usuarioSenha1;

      this.userService.trocarSenha(troca).subscribe(
        retorno => {
          if( retorno )
          {
            this.notification.MostrarNotificacaoSucesso("Senha modificada com sucesso", "Sucesso");
            this.router.navigateByUrl('/');
          }
          else
          {
            this.notification.MostrarNotificacaoErro("Não foi possível realizar a troca, por favor tente mais tarde", "Erro");
          };
        }
      )
    };
    
  }

}
