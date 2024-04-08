import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SeriesPie, RetornoHighcharts } from 'src/app/models/dashboard.operacional.models';
import { TranslateService } from '@ngx-translate/core';
import { Customer } from 'src/app/models/Customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { Projeto } from 'src/app/models/Projeto.model';
import { QuestionarioService } from 'src/app/services/questionario.service';
import { Questionario } from 'src/app/models/questionario.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})

export class BillingComponent implements OnInit {
  Highcharts = Highcharts;

  clientes: Customer[];
  projects: Projeto[];
  questions: Questionario[];
  selectedQuestions: number[];

  projetoID: number = null;
  clienteID: number = null;
  periodoID: number = 12;

  series: SeriesPie[] = [];
  seriePie: SeriesPie = new SeriesPie(null, null);
  
  chartOptions = {
    chart: {
      type: 'area'
  },
  title: {
      text: 'Teste De Billing'
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      allowDecimals: false,
      labels: {
          formatter: function () {
              return this.value; // clean, unformatted number for year
          }
      }
  },
  yAxis: {
      title: {
          text: 'Teste Billing'
      },
      labels: {
          formatter: function () {
              return 'R$ ' + this.value + '.00';
          }
      }
  },
  tooltip: {
      pointFormat: 'R$ <b>{point.y:,.2f}</b>'
  },
  plotOptions: {
      area: {
          pointStart: 1940,
          marker: {
              enabled: false,
              symbol: 'circle',
              radius: 1,
              states: {
                  hover: {
                      enabled: true
                  }
              }
          }
      }
  },
  series: [{
          name: 'Previsão',
          data: [6, 11, 32, 110, 235,
            369, 400, 500, 600, 700, 800, 900, 1000, 1000, 1000, 1000,
            1700, 1700, 1700, 2000, 2000, 2000, 3000, 3000, 7000, 7000,
            7000, 7000, 7000, 7000]
    },{
      name: 'Nielsen',
      data: [
          6, 11, 32, 110, 235,
          369, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
          1400, 1500, 1600, 1700, 1800, 1900, 2000, 2500, 3000, 3500,
          4000, 4500, 5000
      ]
  }]
  }

  chartOptions2 = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Questionários'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>R$ {point.y:.2f}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: R$ {point.y:.2f}',
            }
        }
    },
    series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Spain',
          y: 505370,
          z: 92.9
      }, {
          name: 'France',
          y: 551500,
          z: 118.7
      }, {
          name: 'Poland',
          y: 312685,
          z: 124.6
      }, {
          name: 'Czech Republic',
          y: 78867,
          z: 137.5
      }, {
          name: 'Italy',
          y: 301340,
          z: 201.8
      }, {
          name: 'Switzerland',
          y: 41277,
          z: 214.5
      }, {
          name: 'Germany',
          y: 357022,
          z: 235.6
      }]
    }]
  };

  constructor( private translate: TranslateService, private customerService: CustomerService, private projetoService: ProjetoService,  private questionarioService: QuestionarioService) { }

  ngOnInit() {
    this.customerService.getAllCustomer().subscribe( customer => { if( customer.length == 1 )
                                                                    { 
                                                                      this.clientes = customer;
                                                                      this.clienteID = customer[0].id; 
                                                                    }
                                                                    else
                                                                    {
                                                                      this.clientes = customer;
                                                                    }
                                                                   });
    this.projetoService.GetAllProjetos().subscribe( projetos => { if( projetos.length == 1)
                                                                    {                                                                    
                                                                      this.projects = projetos;
                                                                      this.projetoID = projetos[0].id;
                                                                      this.buscarBilling();
                                                                    }
                                                                    else
                                                                    {
                                                                      this.projects = projetos;
                                                                    }  
                                                                  });
  }

  setDadosGrafico(retorno: RetornoHighcharts) {
    // if( retorno )
    // {
        // this.updateFlag = true;

        // this.chartOptions.chart.type = retorno.chart;
        // this.chartOptions.title.text = (retorno.title == null) ? '' : retorno.title;

        // for( let x in retorno.series )
        // {
        //     if( +x == 0 )
        //     {
        //         this.seriePie = new SeriesPie();
        //         this.translate.stream( retorno.series[x].name ).subscribe( name1 => this.seriePie.name = name1 );
        //         var valor = retorno.series[x].data[0];
        //         this.seriePie.y = valor;
        //         this.seriePie.selected = true;
        //         this.seriePie.sliced = true;
        //         this.series.push( this.seriePie );
        //     }
        //     else
        //     {
        //         this.seriePie = new SeriesPie();
        //         this.translate.stream( retorno.series[x].name ).subscribe( name2 => this.seriePie.name = name2 );
        //         var valorY = retorno.series[x].data[0];
        //         this.seriePie.y = valorY;
        //         this.series.push( this.seriePie );
        //     }   
        // }
    // }         
    // this.liberarGrafico = true;
  }

  buscarBilling(){
    this.questionarioService.GetAllQuestionarioByIdProject( [this.projetoID] ).subscribe( questionario => this.questions = questionario)
  }

}
