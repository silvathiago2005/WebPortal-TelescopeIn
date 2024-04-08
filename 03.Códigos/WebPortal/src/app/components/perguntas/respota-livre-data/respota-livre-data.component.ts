import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { Perguntas } from '../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-respota-livre-data',
  templateUrl: './respota-livre-data.component.html'
})
export class RespotaLivreDataComponent implements OnInit {

  @Input() perguntas: Perguntas
  @Input() coletas: ColetaAlternativa[];
  @Input() type: string
  @Input() disable: boolean;
  @Input() multimidia: Multimidia[] = [];

  resposta: string = null;
  eventResposta = new EventEmitter<string>();
  idColeta: number = null;
  mostrar: boolean = false;

  constructor() { }

  ngOnInit() {
    this.idColeta = this.coletas[0].idColeta
    
    let datepicker: DatePicker = new DatePicker({}); 
    datepicker.appendTo('#datepicker');
    var resp = this.coletas.find(x => x.idPergunta == this.perguntas.id)

    if (resp) {
      this.resposta = resp.respostaDescritiva
      this.eventResposta.emit(this.resposta)
      resp = null
    }

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    if(ret != null)
    {
      this.mostrar = true;
    }
  }

}
