import { Component, OnInit, ViewChild } from '@angular/core';
import { GridsterComponent, IGridsterOptions, IGridsterDraggableOptions } from 'angular2gridster';
import * as Highcharts from 'highcharts'
import { DashboardLayout } from 'src/app/models/dashboard.layout';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionarioService } from 'src/app/services/questionario.service';
import { QuestionarioRetorno } from 'src/app/models/questionario.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { enableRipple } from '@syncfusion/ej2-base';
import { TranslateService } from '@ngx-translate/core';
import { FiltrosSalvos } from 'src/app/models/dashboard.operacional.models';
import { forkJoin } from 'rxjs';

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

enableRipple(true);

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.css']
})

export class GridstersComponent implements OnInit {

  @ViewChild(GridsterComponent) gridster: GridsterComponent

  questionarios: QuestionarioRetorno[] = []
  dashboards: DashboardLayout[] = []
  dashboardLayout: DashboardLayout = new DashboardLayout()

  nomeDashboardAnterior: string = null
  posicao: string = null
  nomeDashboard: string = null
  idQuestionario: number = null
  idDashboard: number = null
  tipoGrafico: number = null
  carregandoQuestionario: boolean = false

  Highcharts = Highcharts;

  produtividadePorUsuario: string = 'Produtividade por Usuário'
  produtividadePorEquipe: string = 'Produtividade por Equipe'
  porcentagemRealizado: string = 'Porcentagem Realizado'
  graficoEvolutivo: string = 'Gráfico Evolutivo'
  graficoAcumulativo: string = 'Gráfico Acumulativo'
  tempoMedioColeta: string = 'Tempo Médio de Coletas'
  metaTotalColetas: string = 'Meta Total de Coletas'
  metaDiariaSemanalMensal: string = 'Meta Diaria, Semanal, Mensal'
  produtividadeRealizado: string = 'Produtividade Geral'

  lang: string = 'en';

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  dataInicial: Date = new Date(this.currentYear -1, this.currentMonth, this.currentDay);
  dataFinal: Date = new Date();
  dataMaxima: Date = new Date();

  gridsterOptions: IGridsterOptions = {
    lanes: 2,
    direction: "vertical",
    dragAndDrop: true,
    resizable: true,
    resizeHandles: {
      s: true, e: true, n: true, w: true, se: true, ne: true, sw: true, nw: true
    },
    lines: {
      visible: true,
      color: '#ffffff',
      width: 2
    },
    useCSSTransforms: true,
    responsiveView: true,
    responsiveDebounce: 25,
    responsiveSizes: true,

    responsiveOptions: [
      {
        breakpoint: 'sm',
        lanes: 3
      },
      {
        breakpoint: 'md',
        minWidth: 768,
        lanes: 8,
        dragAndDrop: true,
        resizable: true
      },
      {
        breakpoint: 'lg',
        minWidth: 1250,
        lanes: 8,
        dragAndDrop: true,
        resizable: true
      },
      {
        breakpoint: 'xl',
        minWidth: 1800,
        lanes: 10,
        dragAndDrop: true,
        resizable: true
      }
    ]
  }

  gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: "panel-heading"
  };

  widgets: Array<any> = [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 0,
      ySm: 0,
      wMd: 4,
      hMd: 2,
      xMd: 0,
      yMd: 0,
      wLg: 4,
      hLg: 2,
      xLg: 0,
      yLg: 0,
      wXl: 5,
      hXl: 2,
      xXl: 0,
      yXl: 0,
      title: this.porcentagemRealizado,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 5
    },
    {
      x: 5,
      y: 3,
      w: 3,
      h: 2,
      wSm: 3,
      hSm: 2,
      xSm: 5,
      ySm: 3,
      wMd: 3,
      hMd: 2,
      xMd: 5,
      yMd: 3,
      wLg: 3,
      hLg: 2,
      xLg: 5,
      yLg: 3,
      wXl: 4,
      hXl: 3,
      xXl: 6,
      yXl: 3,
      title: this.produtividadeRealizado,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 4
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 4,
      ySm: 0,
      wMd: 4,
      hMd: 2,
      xMd: 4,
      yMd: 0,
      wLg: 4,
      hLg: 2,
      xLg: 4,
      yLg: 0,
      wXl: 5,
      hXl: 2,
      xXl: 5,
      yXl: 0,
      title: this.graficoEvolutivo,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 1
    },
    {
      x: 0,
      y: 1,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 0,
      ySm: 1,
      wMd: 4,
      hMd: 2,
      xMd: 0,
      yMd: 1,
      wLg: 4,
      hLg: 2,
      xLg: 0,
      yLg: 1,
      wXl: 5,
      hXl: 2,
      xXl: 0,
      yXl: 1,
      title: this.metaDiariaSemanalMensal,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 2
    },
    {
      x: 4,
      y: 1,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 4,
      ySm: 1,
      wMd: 4,
      hMd: 2,
      xMd: 4,
      yMd: 1,
      wLg: 4,
      hLg: 2,
      xLg: 4,
      yLg: 1,
      wXl: 5,
      hXl: 2,
      xXl: 5,
      yXl: 1,
      title: this.graficoAcumulativo,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 1
    },
    {
      x: 0,
      y: 2,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 0,
      ySm: 2,
      wMd: 4,
      hMd: 2,
      xMd: 0,
      yMd: 2,
      wLg: 4,
      hLg: 2,
      xLg: 0,
      yLg: 2,
      wXl: 5,
      hXl: 2,
      xXl: 0,
      yXl: 2,
      title: this.produtividadePorUsuario,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 2
    },
    {
      x: 4,
      y: 2,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 4,
      ySm: 2,
      wMd: 4,
      hMd: 2,
      xMd: 4,
      yMd: 2,
      wLg: 4,
      hLg: 2,
      xLg: 4,
      yLg: 2,
      wXl: 5,
      hXl: 2,
      xXl: 5,
      yXl: 2,
      title: this.produtividadePorEquipe,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 2
    },
    {
      x: 0,
      y: 3,
      w: 5,
      h: 2,
      wSm: 5,
      hSm: 2,
      xSm: 0,
      ySm: 3,
      wMd: 5,
      hMd: 2,
      xMd: 0,
      yMd: 3,
      wLg: 5,
      hLg: 2,
      xLg: 0,
      yLg: 3,
      wXl: 6,
      hXl: 3,
      xXl: 0,
      yXl: 3,
      title: this.tempoMedioColeta,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 4
    }
  ];

  widgetsBackup: Array<any> = [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 0,
      ySm: 0,
      wMd: 4,
      hMd: 2,
      xMd: 0,
      yMd: 0,
      wLg: 4,
      hLg: 2,
      xLg: 0,
      yLg: 0,
      wXl: 5,
      hXl: 2,
      xXl: 0,
      yXl: 0,
      title: this.porcentagemRealizado,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 5
    },
    {
      x: 5,
      y: 3,
      w: 3,
      h: 2,
      wSm: 3,
      hSm: 2,
      xSm: 5,
      ySm: 3,
      wMd: 3,
      hMd: 2,
      xMd: 5,
      yMd: 3,
      wLg: 3,
      hLg: 2,
      xLg: 5,
      yLg: 3,
      wXl: 4,
      hXl: 3,
      xXl: 6,
      yXl: 3,
      title: this.produtividadeRealizado,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 4
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 4,
      ySm: 0,
      wMd: 4,
      hMd: 2,
      xMd: 4,
      yMd: 0,
      wLg: 4,
      hLg: 2,
      xLg: 4,
      yLg: 0,
      wXl: 5,
      hXl: 2,
      xXl: 5,
      yXl: 0,
      title: this.graficoEvolutivo,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 1
    },
    {
      x: 0,
      y: 1,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 0,
      ySm: 1,
      wMd: 4,
      hMd: 2,
      xMd: 0,
      yMd: 1,
      wLg: 4,
      hLg: 2,
      xLg: 0,
      yLg: 1,
      wXl: 5,
      hXl: 2,
      xXl: 0,
      yXl: 1,
      title: this.metaDiariaSemanalMensal,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 2
    },
    {
      x: 4,
      y: 1,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 4,
      ySm: 1,
      wMd: 4,
      hMd: 2,
      xMd: 4,
      yMd: 1,
      wLg: 4,
      hLg: 2,
      xLg: 4,
      yLg: 1,
      wXl: 5,
      hXl: 2,
      xXl: 5,
      yXl: 1,
      title: this.graficoAcumulativo,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 1
    },
    {
      x: 0,
      y: 2,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 0,
      ySm: 2,
      wMd: 4,
      hMd: 2,
      xMd: 0,
      yMd: 2,
      wLg: 4,
      hLg: 2,
      xLg: 0,
      yLg: 2,
      wXl: 5,
      hXl: 2,
      xXl: 0,
      yXl: 2,
      title: this.produtividadePorUsuario,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 2
    },
    {
      x: 4,
      y: 2,
      w: 4,
      h: 2,
      wSm: 4,
      hSm: 2,
      xSm: 4,
      ySm: 2,
      wMd: 4,
      hMd: 2,
      xMd: 4,
      yMd: 2,
      wLg: 4,
      hLg: 2,
      xLg: 4,
      yLg: 2,
      wXl: 5,
      hXl: 2,
      xXl: 5,
      yXl: 2,
      title: this.produtividadePorEquipe,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 2
    },
    {
      x: 0,
      y: 3,
      w: 5,
      h: 2,
      wSm: 5,
      hSm: 2,
      xSm: 0,
      ySm: 3,
      wMd: 5,
      hMd: 2,
      xMd: 0,
      yMd: 3,
      wLg: 5,
      hLg: 2,
      xLg: 0,
      yLg: 3,
      wXl: 6,
      hXl: 3,
      xXl: 0,
      yXl: 3,
      title: this.tempoMedioColeta,
      resizable: true,
      responsiveSizes: true,
      autosize: true,
      tipoGrafico: 4
    }
  ];

  constructor(  private dashboardService: DashboardService,
                private auth: AuthService,
                private questionario: QuestionarioService,
                private spinner: NgxSpinnerService,
                private notification: NotificationService,
                private translate: TranslateService ) 
                {
                  this.translate.stream("Language").subscribe(x => { this.lang = x; });
                }

  ngOnInit() {
    this.carregandoQuestionario = true;
    forkJoin(
      this.questionario.GetAllQuestionarioIdDescricao(),
      this.dashboardService.GetDashboardsSalvos()
    ).subscribe(
      ([questionario, dashboards]) => {
        this.dashboards = dashboards;
        if( questionario.length == 1 )
        {
          this.idQuestionario = questionario[0].idQuestionario; 
          this.carregandoQuestionario = false;
          this.questionarios = questionario; 
        }
        else
        {
          this.questionarios = questionario;
          this.carregandoQuestionario = false; 
        }
        
        if( [this.questionarios, this.dashboards] )
        {
          var retorno = this.dashboardService.getFiltros();
          if( retorno.idDashboard )
          {
            this.idQuestionario = retorno.idQuestionario;
            this.idDashboard = retorno.idDashboard ? retorno.idDashboard : 0;
            if( retorno.dataInicial != null ) { this.dataInicial = new Date(retorno.dataInicial); }
            if( retorno.dataFinal != null ) { this.dataFinal = new Date(retorno.dataFinal); }
            
            this.setDashboard();
          }
          else
          {
            this.idQuestionario = retorno.idQuestionario;
            if( retorno.dataInicial != null ) { this.dataInicial = new Date(retorno.dataInicial); }
            if( retorno.dataFinal != null ) { this.dataFinal = new Date(retorno.dataFinal); }

            this.setQuestionario();
          }
        }
      }
    );

    //usado para traduzir os componentes de data utilizados
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

  itemChange(widget: any) {
    for (let x in this.Highcharts.charts) 
    {
      if (this.Highcharts.charts[x]) 
      {      
        this.Highcharts.charts[x].reflow();
        this.Highcharts.charts[x].redraw();
      }
    }

    this.gridster.reload();

    this.dashboardService.setPosicao(widget);
  }

  zeraDashboard(){
    this.nomeDashboardAnterior = null;
    this.nomeDashboard = null;
  }

  salvarPosicao() {
    this.spinner.show();

    this.dashboardLayout.id = 0;
    this.dashboardLayout.idQuestionario = +this.idQuestionario;
    this.dashboardLayout.idUsuario = this.auth.getUser().idUsuario;
    this.dashboardLayout.dataInicial = this.dataInicial;
    this.dashboardLayout.dataFinal = this.dataFinal;
    this.dashboardLayout.nome = this.nomeDashboard;
    this.dashboardLayout.layout = this.dashboardService.getPosicao();
    this.dashboardLayout.tipo = 'operacional';
    this.dashboardLayout.dtInclusao = null;
    this.dashboardLayout.dtAlteracao = null;
    this.dashboardLayout.ativo = true;

    this.dashboardService.SaveUpdateDashboarLayout(this.dashboardLayout).subscribe(layout => {  this.spinner.hide();
                                                                                                this.dashboardService.GetDashboardsSalvos().subscribe(dashboads => { this.dashboards = dashboads });
                                                                                                this.idDashboard = layout.id
                                                                                                this.notification.MostrarNotificacaoSucesso("Dashboard salvo", "Sucesso")});
  }

  setQuestionario() {   
    if (!this.idDashboard) 
    {
      this.widgets = this.dashboardService.getPosicaoConvertida()
    } 
    else 
    {
      this.widgets = this.widgetsBackup;
    }  

    this.dashboards = [];
    this.idDashboard = null;
    this.nomeDashboard = null;
    this.setFiltros();
    this.dashboardService.GetDashboardsSalvos().subscribe(dashboads => { this.dashboards = dashboads });
  }

  setDashboard() {
    this.dashboardLayout = this.dashboards.find(d => d.id == this.idDashboard);

    this.idQuestionario = this.dashboardLayout.idQuestionario;
    this.nomeDashboardAnterior = this.dashboardLayout.nome;
    this.nomeDashboard = this.dashboardLayout.nome;
    this.dataInicial = this.dashboardLayout.dataInicial ? new Date(this.dashboardLayout.dataInicial.toString()) : null;
    this.dataFinal = this.dashboardLayout.dataFinal ? new Date(this.dashboardLayout.dataFinal.toString()) : null;
    this.setFiltros();

    this.widgets = JSON.parse(this.dashboardLayout.layout);
  }

  setFiltros(){
    var filtroSalvo = new FiltrosSalvos();
  
    filtroSalvo.idDashboard = this.idDashboard;
    filtroSalvo.idQuestionario = this.idQuestionario;
    filtroSalvo.dataInicial = this.dataInicial ? this.dataInicial.toISOString() : null;
    filtroSalvo.dataFinal = this.dataFinal ? this.dataFinal.toISOString() : null;
    this.dashboardService.setFiltros(filtroSalvo);
  }

  atualizarSalvarPosicao() {
    this.spinner.show();
    this.nomeDashboard = this.nomeDashboard;
    this.dashboardLayout.layout = this.dashboardService.getPosicao();
    this.dashboardLayout.nome = this.nomeDashboard;
    this.dashboardLayout.dataInicial = this.dataInicial;
    this.dashboardLayout.dataFinal = this.dataFinal;

    this.dashboardService.SaveUpdateDashboarLayout(this.dashboardLayout).subscribe(layout => {  this.notification.MostrarNotificacaoSucesso("Dashboard Atualizado", "Sucesso");
                                                                                                this.spinner.hide() });
  }

  deletarPosicao() {
    this.spinner.show();
    if (this.idDashboard) 
    {
      this.dashboardLayout.ativo = false;
      this.dashboardService.SaveUpdateDashboarLayout(this.dashboardLayout).subscribe(layout => {  
                                                                                                  this.dashboardService.GetDashboardsSalvos().subscribe(dashboads => {  this.dashboards = dashboads;
                                                                                                                                                                        this.idDashboard = null;
                                                                                                                                                                        this.idQuestionario = null;
                                                                                                                                                                        this.nomeDashboard = null;
                                                                                                                                                                        this.nomeDashboardAnterior = null; });
                                                                                                  this.widgets = this.widgetsBackup;
                                                                                                  this.notification.MostrarNotificacaoSucesso("Dashboard deletado!", "Sucesso");
                                                                                                  this.spinner.hide() });
    }
  }

  onResize(e){
    for (let x in this.Highcharts.charts) 
    {
      if (this.Highcharts.charts[x]) 
      {      
        this.Highcharts.charts[x].reflow(e);
        this.Highcharts.charts[x].redraw(true);
      }
    }

    this.gridster.reload();
  }

}
