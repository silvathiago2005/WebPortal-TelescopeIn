import { Component, OnInit, Input } from '@angular/core';
import { Operacional } from 'src/app/models/dashboard.operacional.models';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  @Input() tipoGrafico: number;
  @Input() widget: any;
  @Input() idQuestionario: number;
  @Input() IDTipoGrafico: number;
  @Input() dataInicial?: Date = null;
  @Input() dataFinal?: Date = null;

  operacional: Operacional = new Operacional();
  liberarGrafico: boolean = false;
  
  constructor() { }

  ngOnInit() { }

}
