import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Perguntas } from '../../../models/secaoPerguntas.model';
import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-respota-livre-numerica',
  templateUrl: './respota-livre-numerica.component.html'
})
export class RespotaLivreNumericaComponent implements OnInit {

  @Input() perguntas: Perguntas
  @Input() type: string;
  @Input() coletas: ColetaAlternativa[];
  @Input() disable: boolean;
  @Input() multimidia: Multimidia[] = [];

  resposta: string = null;
  idColeta: number = null;
  mostrar: boolean = false;

  constructor() { }

  ngOnInit() {
    this.idColeta = this.coletas[0].idColeta
    var resp = this.coletas.find(x => x.idPergunta == this.perguntas.id)
    
    if (resp) {
      this.resposta = resp.respostaDescritiva
      resp = null
    }

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    if(ret != null)
    {
      this.mostrar = true;
    }
  }

}
