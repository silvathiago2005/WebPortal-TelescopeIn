import { Component, OnInit, Input } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from '../../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../../models/coleta.model';

@Component({
  selector: 'app-sim-nao',
  templateUrl: './sim-nao.component.html'
})
export class SimNaoComponent implements OnInit {

  @Input() perguntas: Perguntas;
  @Input() coletas: ColetaAlternativa[];
  @Input() disabled: boolean = false;
  @Input() dadosSelecao: PerguntaAlternativa;

  checkedSim: boolean = false;
  checkedNao: boolean = false;

  constructor() {
    this.checkedNao = false;
    this.checkedSim = false;
   }

  ngOnInit() {
    var resposta = this.coletas.find(x => x.idPerguntaAlternativa == this.dadosSelecao.id)

    if(resposta){ this.checkedSim = true;
    }else{ this.checkedNao = true; }
  }

}
