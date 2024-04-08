import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../../services/users.service';
import { map, filter } from 'rxjs/operators';
import { Team } from '../../../models/team.model';
import { NotificationService } from '../../../services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-add-team',
  templateUrl: './user-add-team.component.html'
})

export class UserAddTeamComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private notification: NotificationService, private spinner: NgxSpinnerService) { 
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
                      .subscribe((e: NavigationEnd) => {this.lastUrl = e.url})
  }

  @Output() Adicionado = new EventEmitter()
  @Output() Adicionar = new EventEmitter()

  equipesAdicionar: Team[]
  equipesAdicionados: Team[]
  teste: any
  lastUrl: string
  UserId: string

  ngOnInit() {
    this.spinner.show()
    this.route.queryParamMap.pipe(map(params=> params.get('id') || 'Nada')).subscribe(params => this.UserId = params)

    forkJoin(
      this.userService.getAllTeamsByUserAndCustomer(+this.UserId),
      this.userService.getAllTeamsAddUser(+this.UserId)
    ).subscribe(
      ([equipesAdicionar, equipesAdicionados]) => {
        this.equipesAdicionar = equipesAdicionar;
        this.equipesAdicionados = equipesAdicionados;

        if ([equipesAdicionar, equipesAdicionados]){this.spinner.hide()}
      })
  }

  AdicionarUsuario(equipe: Team) {
    var index: number = this.equipesAdicionar.indexOf(equipe)
    this.equipesAdicionados.push(equipe);
    this.equipesAdicionar.splice(index, 1);
    this.Adicionar.emit(equipe.Nome)
    this.Adicionado.emit(equipe.Nome)
  }


  RetirarUsuario(equipe: Team) {
    var index: number = this.equipesAdicionados.indexOf(equipe)
    this.equipesAdicionar.push(equipe)
    this.equipesAdicionados.splice(index, 1)
    this.Adicionado.emit(equipe.Nome)
    this.Adicionar.emit(equipe.Nome)
  }

  RetiraTodos(usuariosParaRetirar: Team[]) {
    this.equipesAdicionar.push.apply(this.equipesAdicionar, usuariosParaRetirar)
    this.equipesAdicionados = []
  }

  AdicionaTodos(usuariosParaAdicionar: Team[]) {
    this.equipesAdicionados.push.apply(this.equipesAdicionados, usuariosParaAdicionar)
    this.equipesAdicionar = []
  }

  Salvar() {
    this.spinner.show()
    this.equipesAdicionados
    this.userService.SaveTeamAddUser(+this.UserId, this.equipesAdicionados).subscribe(x => {
                                                                                      if(x){this.spinner.hide(), 
                                                                                      this.notification.MostrarNotificacaoSucesso("UsuarioModificado", "Sucesso")}
                                                                                    })
  }

  cancelar(){
    this.router.navigate(['/Users'])
  }

}
