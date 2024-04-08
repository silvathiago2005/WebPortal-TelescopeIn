import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from '../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-selecao-lista-externa',
  templateUrl: './selecao-lista-externa.component.html'
})
export class SelecaoListaExternaComponent implements OnInit {

  @Input() perguntas: Perguntas;
  @Input() coletas: ColetaAlternativa[];
  @Input() type: string = 'perguntas';
  @Input() disable: boolean = true;
  @Input() dadosSelecao: PerguntaAlternativa[];
  @Input() multimidia: Multimidia[]; 

  resposta: string = null;
  respostaOutros: string = null;
  eventResposta = new EventEmitter<string>();
  selecao: string = null;
  idColeta: number = null;
  mostrar: boolean = false;
  outros: boolean = false;

  constructor() { }

  ngOnInit() 
  {
    if(this.coletas != undefined)
    {
      this.idColeta =  this.coletas[0].idColeta;

      var resp = this.coletas.find(x => x.idPergunta == this.perguntas.id);
      var resposta = this.dadosSelecao.find(y => y.id == resp.idPerguntaAlternativa);

      if (resposta) 
      {
        this.resposta= resposta.descricao;

        if(resposta.opcaoDescritiva == true && resp.respostaDescritiva )
        {
          this.outros = true;
          this.respostaOutros = resp.respostaDescritiva;
        }
      }    
    }  

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    
    if(ret != null)
    {
      this.mostrar = true;
    }
  }

}
