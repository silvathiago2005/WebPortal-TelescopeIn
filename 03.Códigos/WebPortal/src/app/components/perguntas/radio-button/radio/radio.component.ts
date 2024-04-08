import { Component, OnInit, Input } from '@angular/core';
import { ColetaAlternativa } from 'src/app/models/coleta.model';
import { PerguntaAlternativa } from 'src/app/models/secaoPerguntas.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html'
})
export class RadioComponent implements OnInit {

  @Input() coletas: ColetaAlternativa[];
  @Input() disabled: boolean = false;
  @Input() dadosSelecao: PerguntaAlternativa;

  myPerguntasAlternativas: number = null;
  respostaOutros: string = null;
  checked: boolean = false;
  outros: boolean = false;
  
  constructor() { }

  ngOnInit() 
  {
    var res = this.coletas.findIndex(x => x.idPerguntaAlternativa == this.dadosSelecao.id)
    var resposta = this.coletas[res];
    this.disabled = true;

    if(resposta)
    {
      if( this.dadosSelecao.opcaoDescritiva && resposta.respostaDescritiva )
      {
        this.outros = true;
        this.respostaOutros = resposta.respostaDescritiva; 
      }

      this.myPerguntasAlternativas = resposta.idPerguntaAlternativa;
      this.checked = true;     
    }
  }

}
