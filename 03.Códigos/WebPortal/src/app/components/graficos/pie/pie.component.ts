import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Operacional, RetornoHighcharts, Selecionado, NaoSelecionado, SeriesPie } from 'src/app/models/dashboard.operacional.models';
import { GridsterComponent } from 'angular2gridster';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-pie',
    templateUrl: './pie.component.html',
    styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
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
    noData: boolean = false;
  
    updateFlag: boolean = false;
    operacional: Operacional = new Operacional();

    selecionado: Selecionado = new Selecionado('', 0, true, true);
    naoSelecionado: NaoSelecionado = new Selecionado('', 100);
    valor: number = null;
    valorY: number = null;

    series: SeriesPie[] = [];
    seriePie: SeriesPie = new SeriesPie(null, null);
    type: string = null;
    textTitle: string = null;
    categories: string[] = [];
    text: string = null;  

    chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                }
            }
        },
        series: [{
            name: '',
            colorByPoint: true,
            data: this.series
        }]
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
      
            this.dashBoardService.GetDadosChart( this.operacional ).subscribe( produtividadeEquipe => { if(produtividadeEquipe){
                                                                                                            this.setDadosGrafico(produtividadeEquipe); }
                                                                                                        else{ this.setDadosNull(); }
                                                                                                         });
          } else {
            this.liberarGrafico = true;
          };
    }

    setDadosGrafico(retorno: RetornoHighcharts) {
        if(retorno){
            this.updateFlag = true;

            this.chartOptions.chart.type = retorno.chart;
            this.chartOptions.title.text = (retorno.title == null) ? '' : retorno.title;
    
            for(let x in retorno.series){
                if(+x == 0){
                    this.seriePie = new SeriesPie();
                    this.translate.stream(retorno.series[x].name).subscribe(name1 => this.seriePie.name = name1);
                    var valor = retorno.series[x].data[0];
                    this.seriePie.y = valor;
                    this.seriePie.selected = true;
                    this.seriePie.sliced = true;
                    this.series.push(this.seriePie);
                }
                else{
                    this.seriePie = new SeriesPie();
                    this.translate.stream(retorno.series[x].name).subscribe(name2 => this.seriePie.name = name2);
                    var valorY = retorno.series[x].data[0];
                    this.seriePie.y = valorY;
                    this.series.push(this.seriePie);
                }   
            }
        }         
        this.liberarGrafico = true;
      }

      setDadosNull(){
        this.chartOptions.chart.type = 'pie';
        this.chartOptions.title.text = '';
    
        this.chartOptions.series = [];
  
        this.liberarGrafico = true;
        this.noData = true;
    }

    
}
