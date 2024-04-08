import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GridsterComponent } from 'angular2gridster';
import { Operacional, Series, RetornoHighcharts } from 'src/app/models/dashboard.operacional.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})

export class LineComponent implements OnInit {
  Highcharts = Highcharts;
  gridster: GridsterComponent;

  @Input() widget: any;
  @Input() tipoGrafico: number = null;
  @Input() idQuestionario: number = null;
  @Input() IDTipoGrafico: number = null;
  @Input() liberarGrafico: boolean = null;
  @Input() dataInicial?: Date = null;
  @Input() dataFinal?: Date = null;

  tipoChart: string = 'line';

  updateFlag: boolean = false;
  operacional: Operacional = new Operacional();
  noData: boolean = false;

  type: string = null;
  textTitle: string = null;
  categories: string[] = [];
  text: string = null;
  series: Series[] = [];

  chartOptions = {
    chart: { type: this.tipoChart },
    title: { text: '' },
    subtitle: { text: '' },
    xAxis: {
      tickInterval: 1,
      categories: [],
      title: { text: null }
    },
    yAxis: {
      title: {
        text: ''
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },
    series: this.series,
    exporting: {
      sourceWidth: 2000,
      sourceHeight: 1200,
      enabled: true
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  constructor(private dashBoardService: DashboardService, private translate: TranslateService) { }

  ngOnInit() {
    if (this.IDTipoGrafico && this.idQuestionario) 
    {
      this.operacional.TipoGrafico = this.tipoGrafico;
      this.operacional.idQuestionario = this.idQuestionario;
      this.operacional.iDTipoGrafico =  this.IDTipoGrafico;

      if( this.dataInicial && this.dataFinal )
      {
        this.operacional.DataInicial = this.dataInicial.toISOString();
        this.operacional.DataFinal = this.dataFinal.toISOString();
      }

      this.dashBoardService.GetDadosChart( this.operacional ).subscribe( produtividadeEquipe => { if(produtividadeEquipe){ this.setDadosGrafico(produtividadeEquipe); }
                                                                                                  else{ this.setDadosNull()}; });
    } 
    else 
    {
      this.liberarGrafico = true;
    }
  }

  setDadosGrafico(retorno: RetornoHighcharts) {
    if(retorno)
    {
      this.updateFlag = true;

      this.chartOptions.chart.type = retorno.chart;
      this.chartOptions.title.text = (retorno.title == null) ? '' : retorno.title;
      this.chartOptions.xAxis.categories = (retorno.x_Axis == []) ? [] : retorno.x_Axis;

      this.translate.stream( retorno.y_Axis[0] ).subscribe( y_axis => this.chartOptions.yAxis.title.text = y_axis );
      this.translate.stream( retorno.series[0].name ).subscribe( y_axis => retorno.series[0].name = y_axis );
      this.chartOptions.series = retorno.series;
    }

    this.liberarGrafico = true;
  }

  setDadosNull(){
    this.chartOptions.chart.type = 'line';
    this.chartOptions.title.text = '';
    this.chartOptions.xAxis.categories = [];

    this.chartOptions.yAxis.title.text = '';
    this.chartOptions.series = [];

    this.liberarGrafico = true;
    this.noData = true;
  }
}
