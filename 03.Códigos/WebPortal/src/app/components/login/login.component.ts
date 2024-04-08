import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Login, LoginTemp, UserLogin } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  password = new FormControl();
  email = new FormControl();

  submited: boolean = false;//
  loading: boolean = false;
  form: FormGroup;
  Login = new LoginTemp();
  userLogin: UserLogin;

  constructor(private router: Router, private fb: FormBuilder, private translate: TranslateService, private authService: AuthService, private notification: NotificationService, private spinner: NgxSpinnerService) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  getErrorMessageUsername() {
    return this.email.hasError('required') ? 'Você deve preencher' : '';
  };

  getErrorMassage() {
    return this.password.hasError('required') ? 'You must enter a value' : this.password.hasError('password') ? 'Not a password Valid' : '';
  };

  Logar() {
    this.submited = true
    if (this.form.valid) 
    {
      this.spinner.show();
      var resp = new Login();
      let credentials = this.form.value;
      this.Login.UserEmail = credentials.email;
      this.Login.Password = credentials.password;
      this.authService.getLoginTemp(this.Login).subscribe(loginTemp => { this.userLogin = loginTemp; 
                                                                        // verifica se possui o login digitado no banco
                                                                        if( this.userLogin.success )
                                                                        {
                                                                          // verificar de qual grupo o usuário faz parte antes de logar
                                                                          if ( loginTemp.usuario.idGrupo == 3 || loginTemp.usuario.idGrupo == 4 )
                                                                          { 
                                                                            this.notification.MostrarNotificacaoInfo('Olá, você não possui autorização de acesso as funcionalidades do painel de controle, por favor entre em contato com a gerência responsável para que seja feita a solicitação de acesso.', 'Atenção'); 
                                                                            this.spinner.hide();
                                                                            return; 
                                                                          };
                                                                          resp.nome = loginTemp.usuario.nome;
                                                                          resp.Senha = loginTemp.usuario.senha;
                                                                          resp.Email = loginTemp.usuario.email;
                                                                          resp.idCliente = loginTemp.usuario.idCliente;
                                                                          resp.idUsuario = loginTemp.usuario.id;
                                                                          this.authService.storeUser(resp);
                                                                          // Modo paleativo para saber o idioma do usuário para setar quando entrar
                                                                          if ( loginTemp.usuario.id == 86 || loginTemp.usuario.id == 134 ) 
                                                                          { 
                                                                            localStorage.setItem('language', 'es'); this.translate.use('es'); 
                                                                          }
                                                                          this.notification.MostrarNotificacaoSucesso(`Bem-vindo`, 'Sucesso');
                                                                          this.router.navigate(['/']);
                                                                          this.spinner.hide();
                                                                        }
                                                                        else
                                                                        {
                                                                          this.notification.MostrarNotificacaoInfo(`Desculpe, Usuário não encontrado!`, 'Alerta');
                                                                          this.spinner.hide();
                                                                        }; 
                                                                      })
    }
  }
}
