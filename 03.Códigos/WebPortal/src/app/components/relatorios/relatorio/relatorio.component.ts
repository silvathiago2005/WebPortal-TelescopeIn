import { Component, OnInit } from '@angular/core';
import { QuestionarioService } from 'src/app/services/questionario.service';
import { Questionario } from 'src/app/models/questionario.model';
import { RelatorioParametro } from 'src/app/models/parametros.relatorio.model';
import { Relatorio, RelatorioRetorno } from 'src/app/models/relatorio.model';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  nomeRelatorio: string = null
  siglaParametro: string = null
  nomeParametro: string = null
  tiposParametro: number = null
  isGeneric: boolean = false
  
  comandoSql: string = null
  questionarios: Questionario[] = []
  questionarioSelecionado: number = null
  relatorio: Relatorio = new Relatorio()
  relatorioRetorno: RelatorioRetorno = null
  parametros: RelatorioParametro = new RelatorioParametro()
  conjuntoParametros: RelatorioParametro[] = []

  //variaveis para saber se o relatorio será atualizado
  editandoRelatorio: boolean = false
  idRelatorio: string = null
  buscandoDadosRelatorio: boolean = false
  siglaValidado: boolean = true
  atualizandoRelatorio: boolean = false
  salvandoRelatorio: boolean = false

  constructor(private quest: QuestionarioService, 
              private relatorioService: RelatorioService, 
              private notification: NotificationService, 
              private router: Router, 
              private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.buscandoDadosRelatorio = true;
    this.activeRouter.queryParamMap.pipe(map(params => params.get('idRelatorio') || 'Nada')).subscribe(params => {  this.idRelatorio = params;
                                                                                                                  if( params != "0" ) { this.editandoRelatorio = true;
                                                                                                                                        this.quest.GetAll().subscribe(questionario => this.questionarios = questionario)
                                                                                                                                        this.buscarDadosRelatorio(+this.idRelatorio);
                                                                                                                  } else {
                                                                                                                    this.quest.GetAll().subscribe(questionario => {this.questionarios = questionario;
                                                                                                                                                                   this.buscandoDadosRelatorio = false})
                                                                                                                  };
                                                                                                                }) 
  }

  buscarDadosRelatorio(idRelatorio: number){
    this.relatorio.nomeRelatorio = null
    this.relatorio.scriptSql = null
    this.relatorio.idQuestionario = null
    forkJoin(
      this.relatorioService.GetAllParametrosByRelatorio(idRelatorio),
      this.relatorioService.GetRelatorio(idRelatorio)
    ).subscribe(
      ([parametros, relatorio]) => {
        this.relatorioRetorno = relatorio
        this.nomeRelatorio = this.relatorioRetorno.nomeRelatorio
        this.comandoSql = this.relatorioRetorno.scriptSql
        if(this.relatorioRetorno.idQuestionario == 1 ){
          this.questionarioSelecionado = null;
          this.isGeneric = true;
        } else{
          this.questionarioSelecionado = relatorio.idQuestionario;
          this.isGeneric = relatorio.isGeneric
        }
          this.conjuntoParametros = parametros
        if (this.relatorioRetorno) { this.buscandoDadosRelatorio = false }
      }
    ) 
  }

  guardarParametro(){
    if(!this.validarSigla()){ this.notification.MostrarNotificacaoErro("Sigla repetida", "Erro"); return}
    this.parametros.sigla = this.siglaParametro.toUpperCase()
    this.parametros.nomeParametro = this.nomeParametro
    this.parametros.tipoParametro = this.tiposParametro
    this.conjuntoParametros.push(this.parametros)

    this.parametros = new RelatorioParametro()
    this.siglaParametro = null
    this.nomeParametro = null
    this.tiposParametro = null
  }

  gravarRelatorio(){
    this.salvandoRelatorio = true
    this.relatorio.nomeRelatorio = this.nomeRelatorio
    this.relatorio.idQuestionario = (this.isGeneric)? 0: this.questionarioSelecionado
    this.relatorio.relatorioParametro = this.conjuntoParametros
    this.relatorio.scriptSql = this.comandoSql
    this.relatorio.isGeneric = this.isGeneric

    this.relatorioService.SaveRelatorio(this.relatorio).subscribe(retorno => { if(retorno == true){
                                                                                this.salvandoRelatorio = false
                                                                                this.notification.MostrarNotificacaoSucesso("Relatório Salvo!","Sucesso");
                                                                                this.router.navigateByUrl('/Relatorios')
                                                                              }else{ this.notification.MostrarNotificacaoErro("Relatório não pode ser salvo!", "Erro")}})
  }

  dadosPrenchidos(): boolean{
    return ( this.nomeRelatorio && (this.questionarioSelecionado || this.isGeneric == true) && this.comandoSql ) ? true : false
  }

  atualizarRelatorio(){
    this.atualizandoRelatorio = true
    this.relatorio.id = this.relatorioRetorno.id
    this.relatorio.nomeRelatorio = this.nomeRelatorio
    this.relatorio.idQuestionario = (this.isGeneric)? 1: this.questionarioSelecionado
    this.relatorio.relatorioParametro = this.conjuntoParametros
    this.relatorio.scriptSql = this.comandoSql
    this.relatorio.ativo = true
    this.relatorio.isGeneric = this.isGeneric

    this.relatorioService.SaveRelatorio(this.relatorio).subscribe(retorno => { if(retorno == true){
                                                                                this.atualizandoRelatorio = false
                                                                                this.notification.MostrarNotificacaoSucesso("Relatório Atualizado!","Sucesso");
                                                                                this.router.navigateByUrl('/Relatorios')
    }else{ 
      this.notification.MostrarNotificacaoErro("Relatório não pode ser atualizado!", "Erro")
    }})
  }

  validarSigla(): Boolean{
    var retParametro = this.conjuntoParametros.findIndex(cp => cp.sigla == this.siglaParametro)
    return (retParametro < 0)? true : false
  }

  deletarParametro(parametro: RelatorioParametro){
    var ret = this.conjuntoParametros.findIndex(cp => cp.sigla == parametro.sigla)
    this.conjuntoParametros.splice(ret, 1)
  }

  voltar(){
    this.router.navigateByUrl('/Relatorios')
  }

}
