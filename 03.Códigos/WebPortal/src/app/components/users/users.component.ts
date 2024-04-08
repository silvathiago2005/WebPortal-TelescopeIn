import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/Users.model';
import { PagedListService } from 'ng-paged-list/paged-list.service';
import { UserCustomer_Api } from '../../app.api';
import { Router } from '@angular/router';
import { Team } from '../../models/team.model';
import { NotificationService } from '../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeamService } from '../../services/teams.service';
import { AuthService } from '../../services/auth.service';
import { GrupoAcesso } from 'src/app/models/grupoAcesso.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  usuarios: User[];
  usuario: User;
  usuarioNome: string;
  usuarioLogin: string;
  usuarioEmail: string;
  cargo: string;
  grid: PagedListService;
  admin: boolean = true;
  resposta: any;
  buscandoEquipes: boolean = false;
  isalive: boolean = true;
  validEmail: Boolean = false;
  team: Team[] = [];
  selectedTeam = [];
  accessGroup: GrupoAcesso[] = [];
  usuarioSenha: string = null;
  grupoId: number = null;
  forte: boolean = false;

  filter: any = {
    equipes: <number[]>null,
    nome: <string>null,
    login: <string>null,
    email: <string>null,
    // cargo: <string>null,
    ativo: <boolean>null
  }

  constructor(private userService: UserService, 
              private router: Router, 
              private notification: NotificationService, 
              private spinner: NgxSpinnerService, 
              private teamService: TeamService, 
              private auth: AuthService) {
    this.grid = new PagedListService({
      url: `${UserCustomer_Api}`,
      pageSize: 10,
      sortField: 'Nome',
      sortType: 'asc',
      isAlive: this.isalive
    })
  }

  ngOnInit() {
    this.buscandoEquipes = true;

    this.teamService.getAllTeamsToUser()
                    .subscribe(team => { this.team = team; 
                                         if (team) 
                                         { 
                                           this.buscandoEquipes = false; 
                                         } 
                                        });

    this.teamService.getAllAccessGroup().subscribe(grupoAcesso => this.accessGroup = grupoAcesso);

    this.VerificarBusca();
  }

  VerificarBusca() {
    var guardado = JSON.parse(localStorage.getItem('guardar'));

    if (guardado != null) 
    {
      this.selectedTeam = guardado.equipes;
      if (guardado.nome != null) this.filter.nome = guardado.nome;
      if (guardado.login != null) this.filter.login = guardado.login;
      if (guardado.email != null) this.filter.email = guardado.email;
      // if (guardado.cargo != null) this.filter.cargo = guardado.cargo;
      this.filter.ativo = guardado.ativo;

      this.buscar();
    }
  }

  setUsuario(user: User): any {
    this.usuario = user;
    this.usuarioNome = user.nome;
    this.usuarioLogin = user.login;
    this.usuarioEmail = user.email;
    this.usuarioSenha = user.senha;
    this.grupoId = user.idGrupo;
    this.cargo = user.cargo;

    this.validaSenha();

    return this.usuarioNome, this.usuarioLogin, this.usuarioEmail, this.grupoId;
  }

  Modificar() {   
    // if(this.forte){
      this.spinner.show();
      this.usuario.nome = this.usuarioNome;
      this.usuario.login = this.usuarioLogin;
      this.usuario.email = this.usuarioEmail;
      this.usuario.senha = this.usuarioSenha;
      this.usuario.idGrupo = this.grupoId;
      this.usuario.cargo = this.cargo;
  
      this.userService.updateUsuario(this.usuario)
                      .subscribe(x => { if (x) { this.notification.MostrarNotificacaoSucesso("UsuarioModificado", "Sucesso"), 
                                                 this.spinner.hide(); }
                                        else{ this.notification.MostrarNotificacaoInfo("Não foi possível modificar o usuário", "Alerta"),
                                              this.spinner.hide(); }});
    // }
    // else
    // {
    //   this.notification.MostrarNotificacaoInfo("Senha Fraca", "Alerta");
    // }
    
  }

  Excluir() {
    this.spinner.show();

    this.usuario.nome = this.usuarioNome;
    this.usuario.login = this.usuarioLogin;
    this.usuario.email = this.usuarioEmail;
    this.usuario.ativo = false;

    this.userService.DeleteUser(this.usuario)
                    .subscribe(response => { if (response) { this.notification.MostrarNotificacaoSucesso("UsuarioExcluido", "Sucesso"); 
                                                             this.spinner.hide() };
    })
  }

  Ativar(){
    this.spinner.show();

    this.usuario.nome = this.usuarioNome;
    this.usuario.login = this.usuarioLogin;
    this.usuario.email = this.usuarioEmail;
    this.usuario.ativo = true;

    this.userService.DeleteUser(this.usuario)
                    .subscribe(response => { if (response) { this.notification.MostrarNotificacaoSucesso("UsuarioAtivado", "Sucesso"); 
                                                             this.spinner.hide() };
    })
  }

  validarEmail(){
    const email_regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if(this.filter.email == ""){this.filter.email = null}
    if(!this.validEmail && this.filter.email === null){this.validEmail = false}
    if(this.validEmail && this.filter.email === null){this.validEmail = false}
    if((this.filter.email && email_regex.test(this.filter.email)) || !this.filter.email){this.validEmail = false}
    else{this.validEmail = true;};
  }

  validaSenha(){
    const senha_regex = /(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/;

    this.forte = (senha_regex.test(this.usuarioSenha))? true : false;
  }

  buscar() {
      this.grid.loading = true;
      this.filter.equipes = this.selectedTeam;
      
      if (this.auth.getUser().idUsuario == 1) { this.filter.IDCliente = 1 }
      else { this.filter.IDCliente = this.auth.getUser().idCliente };
      this.grid.load(this.filter, true);

      localStorage.removeItem('guardar');
  }

  AdicionarEquipe(usuario: User) {
    var guardar = JSON.stringify(this.filter);

    localStorage.setItem('guardar', guardar);
    this.filter = null;

    this.router.navigate(['/UserAddTeam'], { queryParams: usuario });
  }

  Limpar() {
    this.selectedTeam = [];
    
    if (this.filter != null) {
      this.filter.nome = null;
      this.filter.email = null;
      this.filter.login = null;
      this.filter.ativo = null;
      // this.filter.cargo = null;
    }
  }

  ngOnDestroy() {
    this.isalive = false;
  }
}
