import { Component, OnInit } from '@angular/core';
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
  selector: 'app-dashboard-operacional',
  templateUrl: './dashboard-operacional.component.html',
  styleUrls: ['./dashboard-operacional.component.css']
})

export class DashboardOperacionalComponent implements OnInit {
  public date: Object = new Date();
  public dateFormatInput: string = 'dd-MM-yyyy';
  public lang: string = null;

  constructor(private translate: TranslateService ) { }

  ngOnInit() {
    // Faz a tradução das palavras dentro do stream
    this.translate.stream('dateFormatInput').subscribe(dateFormatInput => this.dateFormatInput = dateFormatInput);
    this.translate.stream('Language').subscribe(language => this.lang = language);
    // necessário para fazer a internacionalização do componente de data
    L10n.load({
      pt: {
        'datepicker': { 
                            placeholder: 'Selecione um intervalo de data',
                            startLabel: 'Data Inicial',
                            endLabel: 'Data Final',
                            applyText: 'Confirmar',
                            cancelText: 'Cancelar',
                            selectedDays: 'Dias Selecionados',
                            days: 'dias',
                            customRange: ''
        }
      },
      es: {
        'datepicker': { 
                            placeholder: 'Seleccione un intervalo de fecha',
                            startLabel: 'La fecha de inicio',
                            endLabel: 'Fecha Fim',
                            applyText: 'Confirmar',
                            cancelText: 'Cancelar',
                            selectedDays: 'Días Seleccionados',
                            days: 'días',
                            customRange: ''
        }
      },
      en: {
        'datepicker': { 
                            placeholder: 'Select a range of date',
                            startLabel: 'Start Date',
                            endLabel: 'End Date',
                            applyText: 'Apply',
                            cancelText: 'Cancel',
                            selectedDays: 'Selected Days',
                            days: 'days',
                            customRange: ''
        }
      }
    });
   }

}
