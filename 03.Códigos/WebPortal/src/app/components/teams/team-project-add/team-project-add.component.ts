import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjetoService } from '../../../services/projeto.service';
import { Projeto } from '../../../models/Projeto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-team-project-add',
  templateUrl: './team-project-add.component.html'
})
export class TeamProjectAddComponent implements OnInit {  
  @Output() Adicionado = new EventEmitter()
  @Output() Adicionar = new EventEmitter()

  projetosAdicionar: Projeto[]
  projetosAdicionados: Projeto[] = []
  clienteId: string
  equipeId: string

  constructor(private projetoService: ProjetoService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService, private notification: NotificationService) { }

  ngOnInit() {
    this.spinner.show()
    this.route.queryParamMap.pipe(map(params => params.get('idCliente') || 'Nada')).subscribe(params => this.clienteId = params)
    this.route.queryParamMap.pipe(map(params => params.get('id') || 'Nada')).subscribe(params => this.equipeId = params)

    this.projetoService.GetAllProjetosAddEquipe(+this.equipeId).subscribe(projetos => { this.projetosAdicionados = projetos; 
                                                                                        if(projetos){this.spinner.hide()}})
    this.projetoService.GetAllProjetosByEquipe(+this.equipeId).subscribe(projetos => { this.projetosAdicionar = projetos; 
                                                                                        if(projetos){this.spinner.hide()}})
  }

  AdicionarProjeto(projeto: Projeto) {
    var index: number = this.projetosAdicionar.indexOf(projeto)
    this.projetosAdicionados.push(projeto);
    this.projetosAdicionar.splice(index, 1);
    this.Adicionar.emit(projeto.descricao)
    this.Adicionado.emit(projeto.descricao)
  }

  RetirarProjeto(projeto: Projeto) {
    var index: number = this.projetosAdicionados.indexOf(projeto)
    this.projetosAdicionar.push(projeto)
    this.projetosAdicionados.splice(index, 1)
    this.Adicionado.emit(projeto.descricao)
    this.Adicionar.emit(projeto.descricao)
  }

  Salvar() {
    this.spinner.show()
    this.projetosAdicionados
    this.projetoService.PostEquipeAddProjeto(this.equipeId, this.projetosAdicionados)
                       .subscribe(x => {if(x){ this.notification.MostrarNotificacaoSucesso("ModificarEquipe", "Sucesso")};
                                        if(x){ this.spinner.hide(), 
                                               this.router.navigateByUrl('/Teams')}})
  }

  AdicionaTodos(projetosAdicionar: Projeto[]) {
    this.projetosAdicionados.push.apply(this.projetosAdicionados, projetosAdicionar)
    this.projetosAdicionar = []
  }

  RetiraTodos(projetosAdicionados: Projeto[]) {
    this.projetosAdicionar.push.apply(this.projetosAdicionar, projetosAdicionados)
    this.projetosAdicionados = []
  }

}
