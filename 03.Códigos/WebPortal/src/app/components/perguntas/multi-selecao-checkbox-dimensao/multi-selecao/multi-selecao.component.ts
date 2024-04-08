import { Component, OnInit, Input } from '@angular/core';
import { PerguntaAlternativa } from '../../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../../models/coleta.model';

@Component({
  selector: 'app-multi-selecao',
  templateUrl: './multi-selecao.component.html'
})
export class MultiSelecaoComponent implements OnInit {

  @Input() coletas: ColetaAlternativa[];
  @Input() disabled: boolean = false;
  @Input() dadosSelecao: PerguntaAlternativa;

  checked: boolean = false
  
  constructor() { }

  ngOnInit() {
    var resposta = this.coletas.find(x => x.idPerguntaAlternativa == this.dadosSelecao.id)
    
    if(resposta){
      this.checked = true;
    }
  }

}
