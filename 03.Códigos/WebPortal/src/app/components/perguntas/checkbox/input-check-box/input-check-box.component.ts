import { Component, OnInit, Input } from '@angular/core';
import { ColetaAlternativa } from '../../../../models/coleta.model';
import { PerguntaAlternativa } from '../../../../models/secaoPerguntas.model';

@Component({
  selector: 'app-input-check-box',
  templateUrl: './input-check-box.component.html'
})

export class InputCheckBoxComponent implements OnInit {

  @Input() coletas: ColetaAlternativa[];
  @Input() disabled: boolean = false;
  @Input() dadosSelecao: PerguntaAlternativa;
  respostaOutros: string = null;

  checked: boolean = false;
  outros: boolean = false;

  constructor() { }

  ngOnInit() 
  {
    var resposta = this.coletas.find(x => x.idPerguntaAlternativa == this.dadosSelecao.id);

    if(resposta)
    {
      this.checked = true;

      if( this.dadosSelecao.opcaoDescritiva && resposta.respostaDescritiva )
      {
        this.outros = true;
        this.respostaOutros = resposta.respostaDescritiva;
      }
    }   
  }

}
