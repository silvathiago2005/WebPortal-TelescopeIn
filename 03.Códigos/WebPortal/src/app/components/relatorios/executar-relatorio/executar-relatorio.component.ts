import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { RelatorioParametro } from 'src/app/models/parametros.relatorio.model';
import { ExecutarRelatorio, parametrosRelatorio } from 'src/app/models/executar.relatorio.model';
import { RelatorioRetorno } from 'src/app/models/relatorio.resposta.model';
import { QuestionarioService } from 'src/app/services/questionario.service';
import { Questionario } from 'src/app/models/questionario.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { loadCldr, L10n } from '@syncfusion/ej2-base';

declare var require: any;

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/pt/ca-gregorian.json'),
  require('cldr-data/main/pt/numbers.json'),
  require('cldr-data/main/pt/timeZoneNames.json'),
  require('cldr-data/main/es/ca-gregorian.json'),
  require('cldr-data/main/es/numbers.json'),
  require('cldr-data/main/es/timeZoneNames.json')
  );


@Component({
  selector: 'app-executar-relatorio',
  templateUrl: './executar-relatorio.component.html',
  styleUrls: ['./executar-relatorio.component.css']
})
export class ExecutarRelatorioComponent implements OnInit {
  dtOptions: any = {};

  parametros: parametrosRelatorio = new parametrosRelatorio();
  executarRelatorio: ExecutarRelatorio = new ExecutarRelatorio();

  parametrosRelatorio: RelatorioParametro[] = [];
  conjuntoParametros: parametrosRelatorio[] = [];
  questionarios: Questionario[] = [];

  idRelatorio: string = null;
  idQuestionario: string = null;
  buscandoResultado: Boolean = false;
  executandoBusca: Boolean = false;  
  relatorioReturn: RelatorioRetorno = null;
  nomeRelatorio: string = null;
  nomeRelatorioTraduzido: string = null;
  nomeRelatorioAnterior: string = null;
  naoEncontrado: boolean = false;
  // dataMaxima: Date = new Date();
  lang: string = null;
  buscandoQuestionario: boolean = false;  

  constructor( private activeRouter: ActivatedRoute, 
               private router: Router, 
               private relatorioService: RelatorioService, 
               private questionario: QuestionarioService, 
               private notification: NotificationService,
               private translate: TranslateService ) { 
                this.activeRouter.queryParamMap.pipe(map(params => params.get('idRelatorio') || 'Nada')).subscribe( params => this.idRelatorio = params );
                this.activeRouter.queryParamMap.pipe(map(params => params.get('idQuestionario') || 'Nada')).subscribe(  params => this.idQuestionario = params );
                this.activeRouter.queryParamMap.pipe(map(params => params.get('nomeRelatorio') || 'Nada')).subscribe(  params => this.nomeRelatorio = params );

                this.translate.stream(this.nomeRelatorio).subscribe(nometraduzido => { this.setarTraducao(nometraduzido) });
                this.translate.stream('Language').subscribe(language => this.lang = language);
               };

  ngOnInit() {
    this.buscandoQuestionario = true;
    this.relatorioService.GetAllParametrosByRelatorio(+this.idRelatorio).subscribe(parametros => { if( !parametros.length){ this.pesquisar(); } 
                                                                                                  else { this.parametrosRelatorio = parametros; }});
    this.questionario.GetAllQuestionarioByIdCliente().subscribe(questionario => { this.questionarios = questionario;
                                                                                  this.buscandoQuestionario = false; });

    L10n.load({
      pt: {
        'datepicker': { 
                            placeholder: 'Selecione uma Data',
                            today: 'Hoje'
        }
      },
      es: {
        'datepicker': { 
                            placeholder: 'Seleccione una fecha',
                            today: 'Hoy'
        }
      },
      en: {
        'datepicker': { 
                            placeholder: 'Select a date',
                            today: 'Today'
        }
      }
    });
  }

  setarTraducao(nometraduzido: string){
    if(this.nomeRelatorioTraduzido == null){
      this.nomeRelatorioTraduzido = nometraduzido;
      this.nomeRelatorioAnterior = nometraduzido;
    }else{
      this.nomeRelatorioTraduzido = nometraduzido;
    };
    
    this.limparDtOptions();

    if(this.nomeRelatorioAnterior != nometraduzido){
      this.nomeRelatorioAnterior = nometraduzido;
      this.pesquisar();
    };

    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excel',
          text: '<i class="fa fa-file-excel-o"></i> Excel',
          titleAttr: 'Excel',
          key: '1',
          title: this.nomeRelatorioTraduzido
        }
      ]
    };
  };

  limparDtOptions(){
    this.dtOptions = {};
  }

  pesquisar() {
    this.relatorioReturn = null;
    this.conjuntoParametros = [];
    this.buscandoResultado = true;
    this.executarRelatorio.idQuestionario = +this.idQuestionario;
    this.executarRelatorio.idRelatorio = +this.idRelatorio;
    for ( let x in this.parametrosRelatorio ) {
        this.parametros = new parametrosRelatorio();
        this.parametros.sigla = this.parametrosRelatorio[x].sigla;
        this.parametros.tipoParametro = this.parametrosRelatorio[x].tipoParametro;
      if( this.parametrosRelatorio[x].tipoParametro == 5 && this.parametrosRelatorio[x].valor == null ){
          this.notification.MostrarNotificacaoErro("Por Favor! Selecione uma opção", "Erro");
          this.buscandoResultado = false;
          return;
      }     
      if(this.parametrosRelatorio[x].tipoParametro == 3 && (this.parametrosRelatorio[x].valor == null || this.parametrosRelatorio[x].valor == undefined)){
          this.notification.MostrarNotificacaoErro("Por favor! Insira uma data válida", "Erro");
          this.buscandoResultado = false;
          return
      }
      if(this.parametrosRelatorio[x].tipoParametro == 3){
        this.parametros.valor = new Date(this.parametrosRelatorio[x].valor).toISOString();
      }else{
        this.parametros.valor = this.parametrosRelatorio[x].valor;
      };
      this.conjuntoParametros.push(this.parametros);
    };

    this.executarRelatorio.parametrosRelatorio = this.conjuntoParametros;
    this.relatorioService.ExecutarRelatorio(this.executarRelatorio).subscribe(resultado => { if(resultado){
                                                                                                this.relatorioReturn = resultado;
                                                                                                this.buscandoResultado = false; 
                                                                                                this.naoEncontrado = false}
                                                                                                else {
                                                                                                  this.buscandoResultado = false;
                                                                                                  this.notification.MostrarNotificacaoInfo("Nenhum resultado encontrado", "Informação");
                                                                                                }                      
                                                                                              });
  }

  Limpar(){
    for( var x in this.parametrosRelatorio ){
      this.parametrosRelatorio[x].valor = null;
    };
  };

  voltar(){
    this.router.navigateByUrl('/Relatorios');
  };
}
