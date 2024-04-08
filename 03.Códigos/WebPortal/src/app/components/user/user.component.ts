import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/Customer.model';
import { User } from '../../models/Users.model';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../services/notification.service';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/teams.service';
import { GrupoAcesso } from '../../models/grupoAcesso.model';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  @Output() salvo = new EventEmitter();
  clientes: Customer[];
  accessGroup: GrupoAcesso[] = [];
  user: User = new User();
  usuarios: User[];

  idcliente: number;
  value: string = null;
  qtd: number = 0;
  confirmaSenha: string;
  team: Team[] = [];
  selectedTeam = [];
  selectedGroup: number = null;
  nome: string;
  senha: string;

  Selecione: string;
  selectedCliente: number;
  selected: number;
  usuarioSenha: string = null;
  usuarioSenha2: string = null;

  nomeCompleto = new FormControl();
  emailAddress = new FormControl();
  usuario = new FormControl();
  password = new FormControl();
  password2 = new FormControl();
  cliente = new FormControl();
  grupo = new FormControl();
  equipe = new FormControl();

  // validações
  validNome: Boolean = false;
  validEmail: Boolean = false;
  validEmailExistente: Boolean = false;
  validUsuarioExistente: Boolean = false;
  validUsuario: Boolean = false;
  validSenha: Boolean = false;
  validSelectedCliente: Boolean = false;
  validSelectedGroup: Boolean = false;
  validSelectedTeam: Boolean = false;
  forte: Boolean = false;
  senhaErrada: Boolean = false;

  submited: boolean = false;
  formUsuario: FormGroup;

  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private teamService: TeamService,
    private notification: NotificationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.formUsuario = this.formBuilder.group({
      nomeCompleto: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      usuario: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      password2: ['', Validators.compose([Validators.required])],
      cargo: [''],
      cliente: ['', Validators.compose([Validators.required])],
      grupo: ['', Validators.compose([Validators.required])],
      equipe: ['', Validators.compose([Validators.required])]
    })

  }

  ngOnInit() {
    this.spinner.show()
    forkJoin(
      this.customerService.getAllCustomer(),
      this.teamService.getAllAccessGroup(),
      this.teamService.getAllTeamsToUser()
    ).subscribe(([clientes, group, team]) => {
      this.clientes = clientes;
      this.accessGroup = group;
      this.team = team;
      if ([clientes, group, team]) { this.spinner.hide() }
    })
  }

  SetCliente(cliente: Customer) {
    this.idcliente = cliente.id;
  }

  SetGrupo(group: GrupoAcesso) {
    this.selectedGroup = group.id;
  }

  // área para validar o conteúdo do form
  getErrorMessageNomeCompleto() {
    return this.nomeCompleto.hasError('required') ? 'Você deve preencher' : '';
  }

  getErrorMessageEmai() {
    return this.emailAddress.hasError('required') ? 'Você deve preeencher' :
      this.emailAddress.hasError('email') ? 'não é um email válido' : '';
  }

  getErrorMessageUsuario() {
    return this.usuario.hasError('required') ? 'Você deve preencher' : '';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Você deve preencher' : '';
  }

  getErrorMessagePassword2() {
    return this.password2.hasError('required') ? 'Você deve preencher' : '';
  }

  getErrorMessageCliente() {
    return this.cliente.hasError('required') ? 'Você deve preencher' : '';
  }

  getErrorMessageGrupo() {
    return this.grupo.hasError('required') ? 'Você deve preencher' : '';
  }

  getErrorMessageEquipe() {
    return this.equipe.hasError('required') ? 'Você deve preencher' : '';
  }
  // fim da área de validação

  Salvar() {
    this.submited = true

    if( this.usuarioSenha2 != this.usuarioSenha )
    {
      this.notification.MostrarNotificacaoInfo("SenhaErrada", "Alerta");
      return;
    }

    if (this.formUsuario.valid) 
    {
      let credentials = this.formUsuario.value;
      this.user.IDCliente = credentials.cliente;
      this.user.nome = credentials.nomeCompleto;
      this.user.login = credentials.usuario;
      this.user.email = credentials.emailAddress;
      this.user.idGrupo = credentials.grupo;
      this.user.equipes = credentials.equipe;
      this.user.senha = credentials.password;
      this.user.cargo = credentials.cargo;
      this.EnviarUsuario(this.user);
    }
  }

  mostrarSalvar(): boolean {
    if ( this.nome && this.usuario && this.validEmail && this.confirmaSenha == this.senha && this.senha && this.selectedCliente && this.selectedGroup && this.selectedTeam != [] && this.usuarioSenha2 == this.usuarioSenha ) { return true; }
    return false;
  }

  EnviarUsuario(usuario: User) {
    this.validEmailExistente = false;
    this.validUsuarioExistente = false;
    this.spinner.show();

    this.userService.postNewUsuario(usuario)
      .subscribe(resp => {
        if (resp == "Email já existe") 
        {
          this.validEmailExistente = true;
          this.spinner.hide();
          this.notification.MostrarNotificacaoWarning("Email já cadastrado", "Alerta");
          return;
        }
        if (resp == "Login já existe") 
        {
          this.validUsuarioExistente = true;
          this.spinner.hide();
          this.notification.MostrarNotificacaoWarning("Usuário já cadastrado", "Alerta");
          return;
        }
        if (resp != "Email já existe" && resp != "Login já existe") 
        {
          this.notification.MostrarNotificacaoSucesso("UsuarioSalvo", "Sucesso");
          this.spinner.hide();
          this.router.navigateByUrl('/Users');
        };
      })
  }

  validaSenha(){
    const senha_regex = /(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/;

    this.forte = (senha_regex.test(this.usuarioSenha))? true : false;
  }

  validarSenhasIguais(){
     this.senhaErrada = (this.usuarioSenha2 == this.usuarioSenha)? false : true;
  }

  cancelar() {
    this.formUsuario = null;

    this.router.navigateByUrl('/Users');
  }
}
