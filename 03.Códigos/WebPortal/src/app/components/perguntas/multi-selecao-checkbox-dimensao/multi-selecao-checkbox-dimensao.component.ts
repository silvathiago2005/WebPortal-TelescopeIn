import { Component, OnInit, Input } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from '../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-multi-selecao-checkbox-dimensao',
  templateUrl: './multi-selecao-checkbox-dimensao.component.html'
})
export class MultiSelecaoCheckboxDimensaoComponent implements OnInit {

  @Input() perguntas: Perguntas;
  @Input() type: string = "pergunta";
  @Input() dadosSelecao: PerguntaAlternativa[] 
  @Input() coletas: ColetaAlternativa[];
  @Input() multimidia: Multimidia[] = [];

  myPerguntasAlternativas: string = null;
  checked: boolean = false;
  disabled: boolean = true;
  idColeta: number = null;
  mostrar: boolean = false;

  constructor() { }

  ngOnInit() { 
    this.idColeta = this.coletas[0].idColeta;

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    if(ret != null)
    {
      this.mostrar = true;
    }
  }

}
