import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GridsterComponent } from 'angular2gridster';
import { Operacional, RetornoHighcharts, Series } from 'src/app/models/dashboard.operacional.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
    Highcharts = Highcharts;
    gridster: GridsterComponent;
  
    @Input() widget: any;
    @Input() tipoGrafico: number = null;
    @Input() idQuestionario: number = null;
    @Input() IDTipoGrafico: number = null;
    @Input() liberarGrafico: boolean = null;
    @Input() dataInicial?: Date = null;
    @Input() dataFinal?: Date = null;
    tipoChart: string = 'column';
  
    updateFlag: boolean = false;
    operacional: Operacional = new Operacional();
    noData: boolean = false;
  
    type: string = null;
    textTitle: string = null;
    categories: string[] = [];
    text: string = null;
    series: Series[] = [];

    chartOptions = {
        chart: { type: '' },
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: {
          tickInterval: 1,
          categories: [],
          title: { text: null }
        },
        yAxis: {
          // min: 0,
          title: {
            text: '',
            align: 'high'
          },
          labels: { overflow: 'justify' }
        },
        tooltip: { valueSuffix: '' },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
          series: { 
            colorByPoint: true 
          }
        },
        series: this.series,
        exporting: {
          sourceWidth: 2000,
          sourceHeight: 1200,
          enabled: true
        }
      };

  constructor(private dashBoardService: DashboardService, private translate: TranslateService) { }

  ngOnInit() {
    if (this.IDTipoGrafico && this.idQuestionario) {
        this.operacional.TipoGrafico = this.tipoGrafico;
        this.operacional.idQuestionario = this.idQuestionario;
        this.operacional.iDTipoGrafico =  this.IDTipoGrafico;

        if( this.dataInicial && this.dataFinal )
        {
          this.operacional.DataInicial = this.dataInicial.toISOString();
          this.operacional.DataFinal = this.dataFinal.toISOString();
        }
  
        this.dashBoardService.GetDadosChart( this.operacional ).subscribe( produtividadeEquipe => { if(produtividadeEquipe){ this.setDadosGrafico(produtividadeEquipe); }
                                                                                                    else{ this.setDadosNull(); }})
      } else {
        this.liberarGrafico = true;
      }
  }

  setDadosGrafico(retorno: RetornoHighcharts) {
    if(retorno){
      this.translate.stream( retorno.series[0].name ).subscribe( y_axis => this.chartOptions.yAxis.title.text = y_axis );
      this.updateFlag = true;
  
      this.chartOptions.chart.type = retorno.chart;
      this.chartOptions.title.text = (retorno.title == null) ? '' : retorno.title;
      if(retorno.x_Axis != []){
        for(let x in retorno.x_Axis){
          var traduzir = retorno.x_Axis[x].toString();
          this.translate.stream( traduzir ).subscribe( x_axis => this.chartOptions.xAxis.categories.push(x_axis) );
        };
      };
  
      this.chartOptions.series = retorno.series;
      this.translate.stream( retorno.series[0].name ).subscribe( name => retorno.series[0].name = name );
    }   

    this.liberarGrafico = true;
  }

  setDadosNull(){
    this.chartOptions.chart.type = 'column';
    this.chartOptions.title.text = '';
    this.chartOptions.xAxis.categories = [];

    this.chartOptions.yAxis.title.text = '';
    this.chartOptions.series = [];

    this.liberarGrafico = true;
    this.noData = true;
  }
}
