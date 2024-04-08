import { Component, OnInit, Input } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from '../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-checkbox-sim-nao',
  templateUrl: './checkbox-sim-nao.component.html'
})
export class CheckboxSimNaoComponent implements OnInit {

  @Input() perguntas: Perguntas;
  @Input() type: string;
  @Input() coletas: ColetaAlternativa[];
  @Input() disable: boolean = true;
  @Input() dadosSelecao: PerguntaAlternativa[];
  @Input() multimidia: Multimidia[] = [];

  checkedSim: boolean = false;
  checkedNao: boolean = false;
  idColeta: number = null;
  disabled: boolean = true;
  mostrar: boolean = false;

  constructor() { }

  ngOnInit() { 
    this.idColeta = this.coletas[0].idColeta

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    if(ret != null)
    {
      this.mostrar = true;
    }
  }

}
