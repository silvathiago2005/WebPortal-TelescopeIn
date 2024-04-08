import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PagedListService } from 'ng-paged-list/paged-list.service';
import { GetAllControle } from '../../app.api';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/Customer.model';
import { QuestionarioRetorno } from '../../models/questionario.model';
import { QuestionarioService } from '../../services/questionario.service';
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
  selector: 'app-exportacao-dados',
  templateUrl: './exportacao-dados.component.html'
})

export class ExportacaoDadosComponent implements OnInit, OnDestroy {
  clientes: Customer[];
  questionarios: QuestionarioRetorno[];
  selectedCliente: any;
  selectedQuestionario: any;
  user: any;
  grid: PagedListService;
  lang: string = null;

  mostrarSpinner: boolean = false;
  isalive: boolean = true;
  informarUsuario: boolean = false;

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  dataInicial: Date = new Date(this.currentYear, this.currentMonth, this.currentDay - 1);
  dataFinal: Date = new Date();
  dataMaxima: Date = new Date();
  pesquisado: boolean = false;

  filter: any = {
    idQuestionario: <number[]>null,
    dataInicio: <string>null,
    dataFim: <string>null
  };

  constructor(private auth: AuthService, private translate: TranslateService, private customerService: CustomerService, private questionarioService: QuestionarioService) {
    this.mostrarSpinner = true;

    this.translate.stream('Language').subscribe(language => this.lang = language);

    this.questionarioService.GetAllQuestionarioIdDescricao().subscribe(questionario => { this.questionarios = questionario; 
                                                                                         if(questionario){ this.mostrarSpinner = false; }});

    this.user = this.auth.getUser().idCliente;

    this.grid = new PagedListService({
      url: `${GetAllControle}`,
      pageSize: 10,
      sortField: 'Nome',
      sortType: 'desc',
      isAlive: this.isalive
    });
  };

  ngOnInit() { 
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
  };

  buscar() {
    if(!this.selectedQuestionario){this.informarUsuario = true; return}
    this.filter.idQuestionario = this.selectedQuestionario;
    this.filter.dataInicio = this.dataInicial.toISOString();
    this.filter.dataFim = this.dataFinal.toISOString();

    this.grid.load(this.filter, true);
    this.pesquisado = true;
  };

  download(endereco: any) {
    window.open(endereco.caminho, '_blank');
  };

  ngOnDestroy() {
    this.isalive = false;
  };

}
