import { Component, OnInit, Output } from '@angular/core';
import { TeamService } from '../../services/teams.service';
import { Team } from '../../models/team.model';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../../services/customer.service';
import { TeamAdd } from '../../models/teamAdd.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../services/notification.service';
import { EventEmitter } from 'events';
import { forkJoin } from 'rxjs';

const novaEquipe = new TeamAdd(0, null, null);
declare const $: any;

export interface cliente {
  nome: string;
  nomeValue: string;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit {
  clientes: Customer[]
  cliente: Customer
  teams: Team[]
  equipe: Team
  nomeEquipe: string
  nomeCliente: string
  IdCliente: number
  show: boolean = true
  @Output() excluido = new EventEmitter()
  navigationSubscription;
  selectedCliente: any

  // validações
  validCliente: boolean = false
  validNomeEquipe: boolean = false

  constructor(private teamService: TeamService, private customerService: CustomerService, private router: Router, 
              private spinner: NgxSpinnerService, private notification: NotificationService) {}

  ngOnInit() {
    this.spinner.show();
    forkJoin(
      this.teamService.getTeamToUserId(),
      this.customerService.getAllCustomer()
    ).subscribe(([teams, clientes])=>{
      this.teams = teams;
      this.clientes = clientes;
      // faz a inclusão do cliente conforme o idCliente, temporário
      for(var x in teams){
        var idCustomer = teams[x].IDCliente
        var cliente = this.clientes.find(x => x.id == idCustomer)
        teams[x].Cliente = cliente
      }
      if([this.teams.length > 0 && this.clientes.length > 0]){this.spinner.hide()}
    })
  }

  verificar(clientes: Customer[]) {
    this.nomeEquipe = null;
    if (clientes.length < 2) {
      this.show = true;
      this.cliente = clientes[0]
      this.selectedCliente = clientes[0].id
    } else {
      this.show = false;
    }
  }

  Excluir() {
    this.spinner.show()

    this.teamService.deleteTeam(this.equipe).subscribe(team => { this.equipe = team; 
                                                                 if(team){ this.notification.MostrarNotificacaoSucesso("EquipeExcluida", "Sucesso")}; 
                                                                 if(team){ this.spinner.hide(); 
                                                                           this.ngOnInit()}})
  }

  Adicionar(nomeEquipe: string) {
    if(!this.nomeEquipe){this.validNomeEquipe = true}else{this.validNomeEquipe = false}
    if(!this.selectedCliente){this.validCliente = true}else{this.validCliente = false}
    if(this.validNomeEquipe || this.validCliente){return}
    else{
      this.spinner.show()
      $('#modalAdd').modal('hide');
      novaEquipe.IDCliente = this.selectedCliente
      novaEquipe.Nome = nomeEquipe
      novaEquipe.Ativo = true

      this.teamService.postAddTeam(novaEquipe).subscribe(team => { this.equipe = team;
                                                                    if(team){ this.notification.MostrarNotificacaoSucesso("EquipeAdicionado", "Sucesso")};
                                                                    if(team){ this.spinner.hide(); 
                                                                              this.validCliente = false; 
                                                                              this.validNomeEquipe = false; 
                                                                              this.selectedCliente = null; 
                                                                              this.ngOnInit()}})
    }   
  }

  Modificar(nome: string) {
    this.spinner.show()
    this.equipe.Nome = nome;
    this.teamService.putTeam(this.equipe).subscribe(team => { this.equipe = team;
                                                              if(team){ this.notification.MostrarNotificacaoSucesso("EquipeModificado", "Sucesso")};
                                                              if(team){ this.spinner.hide()}})
  }

  Cancelar(){
    this.nomeEquipe = null
    this.selectedCliente = null
    this.validNomeEquipe = false
    this.validCliente = false
  }

  setEquipe(team: Team): string {
    this.nomeEquipe = team.Nome;
    this.equipe = team;
    return this.nomeEquipe
  }

  setClienteNome(cliente: Customer): string {
    this.nomeCliente = cliente.nome;
    this.IdCliente = cliente.id;
    return this.nomeCliente;
  }

  AdicionarUsuario(equipe: Team) {
    this.router.navigate(['/AddUser'], { queryParams: {id: equipe.Id, idCliente: equipe.IDCliente}})
  }

  AdicionarProjeto(equipe: Team) {
    this.router.navigate(['/AddProject'], { queryParams: {id: equipe.Id, idCliente: equipe.IDCliente}})
  }
}
