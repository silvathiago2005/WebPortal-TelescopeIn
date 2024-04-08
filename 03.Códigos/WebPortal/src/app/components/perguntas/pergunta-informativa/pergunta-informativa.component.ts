import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from 'src/app/models/secaoPerguntas.model';
import { ColetaAlternativa } from 'src/app/models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-pergunta-informativa',
  templateUrl: './pergunta-informativa.component.html',
  styleUrls: ['./pergunta-informativa.component.css']
})
export class PerguntaInformativaComponent implements OnInit {
  @Input() perguntas: Perguntas;
  @Input() secao: any;
  @Input() coletas: ColetaAlternativa[];
  @Input() dadosSelecao: PerguntaAlternativa[];
  @Input() disable: boolean;
  @Input() multimidia: Multimidia[] = [];

  resposta: string = null;
  eventResposta = new EventEmitter<string>();
  idColeta: number = null;
  idPergunta: number = null;
  mostrar: boolean = false;
  
  constructor() { }

  ngOnInit() {
    this.idColeta = this.coletas[0].idColeta;

    if( this.perguntas.perguntaConfigs[1] )
    {
      this.resposta = this.perguntas.perguntaConfigs[1].valor;
      

    for( var x in this.secao )
    {
      for( var y in this.secao[x].perguntas )
      {
        this.idPergunta = this.secao[x].perguntas[y].id;

        if( this.secao[x].perguntas[y].idTipoPergunta == 3 )
        { }
        else if( this.secao[x].perguntas[y].idTipoPergunta == 7 || this.secao[x].perguntas[y].idTipoPergunta == 9 )
        {
          if( this.resposta.includes(`#${this.secao[x].perguntas[y].numero}#`) )
          {
            var resp = this.coletas.find(c => c.idPergunta == this.secao[x].perguntas[y].id);
            var resp2 = this.secao[x].perguntas[y].perguntaAlternativas.find(pa => pa.id == resp.idPerguntaAlternativa);

            this.resposta = this.resposta.split(`#${this.secao[x].perguntas[y].numero}#`).join(resp2.descricao);
          }
        }
        else if( this.secao[x].perguntas[y].idTipoPergunta == 12 )
        {
          if( this.resposta.includes(`#${this.secao[x].perguntas[y].numero}#`) )
          {
          var resp = this.coletas.find(c => c.idPergunta == this.secao[x].perguntas[y].id);

          this.resposta = this.resposta.split(`#${this.secao[x].perguntas[y].numero}#`).join(resp.entidade.descricao);
          }
        }
        else
        {
          if( this.resposta.includes(`#${this.secao[x].perguntas[y].numero}#`) )
          {
            var resp = this.coletas.find(c => c.idPergunta == this.secao[x].perguntas[y].id);

            this.resposta = this.resposta.split(`#${this.secao[x].perguntas[y].numero}#`).join(resp.respostaDescritiva);
          }
        }        
      }
    }
  } 

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    if( ret != null )
    {
      this.mostrar = true;
    }
  }

}
