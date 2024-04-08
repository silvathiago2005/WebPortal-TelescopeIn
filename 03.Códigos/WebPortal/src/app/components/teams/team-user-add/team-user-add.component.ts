import { Component, OnInit, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'events';
import { map } from 'rxjs/operators';
import { UserService } from '../../../services/users.service';
import { User } from '../../../models/Users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-team-user-add',
  templateUrl: './team-user-add.component.html'
})

export class TeamUserAddComponent implements OnInit { 
  @Output() Adicionado = new EventEmitter()
  @Output() Adicionar = new EventEmitter()

  usuarioAdicionar: User[]
  usuariosAdicionados: User[]
  equipeId: string
  clienteId: string

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private spinner: NgxSpinnerService, private notification: NotificationService) { }

  ngOnInit() {
    this.spinner.show();

    this.route.queryParamMap.pipe(map(params => params.get('idCliente') || 'Nada')).subscribe(params => this.clienteId = params)
    this.route.queryParamMap.pipe(map(params => params.get('id') || 'Nada')).subscribe(params => this.equipeId = params)

    this.userService.getAllUsersCustomer(+this.clienteId, +this.equipeId).subscribe(users => { this.usuarioAdicionar = users; 
                                                                                               if( users )
                                                                                               {
                                                                                                 this.spinner.hide()
                                                                                                }} )
    this.userService.getAllUsersAddEquipe(+this.clienteId , this.equipeId).subscribe(users => { this.usuariosAdicionados = users; 
                                                                                                if( users )
                                                                                                {
                                                                                                  this.spinner.hide()
                                                                                                }})
  }

  AdicionarUsuario(usuario: User) {
    var index: number = this.usuarioAdicionar.indexOf(usuario)
    this.usuariosAdicionados.push(usuario);
    this.usuarioAdicionar.splice(index, 1);
    this.Adicionar.emit(usuario.nome)
    this.Adicionado.emit(usuario.nome)
  }

  RetirarUsuario(usuario: User) {
    var index: number = this.usuariosAdicionados.indexOf(usuario)
    this.usuarioAdicionar.push(usuario)
    this.usuariosAdicionados.splice(index, 1)
    this.Adicionado.emit(usuario.nome)
    this.Adicionar.emit(usuario.nome)
  }

  Salvar() {
    this.spinner.show()
    this.usuariosAdicionados
    this.userService.postUsersAddEquipe(this.equipeId, this.usuariosAdicionados).subscribe(x => { if(x){ this.notification.MostrarNotificacaoSucesso("ModificarEquipe", "Sucesso")};
                                                                                                  if(x){ this.spinner.hide(), 
                                                                                                         this.router.navigateByUrl('/Teams')}} )
    
  }

  RetiraTodos(usuariosParaRetirar: User[]) {
    this.usuarioAdicionar.push.apply(this.usuarioAdicionar, usuariosParaRetirar)
    this.usuariosAdicionados = []
  }

  AdicionaTodos(usuariosParaAdicionar: User[]) {
    this.usuariosAdicionados.push.apply(this.usuariosAdicionados, usuariosParaAdicionar)
    this.usuarioAdicionar = []
  }
}
