import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from 'src/app/models/secaoPerguntas.model';
import { ColetaAlternativa } from 'src/app/models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-pergunta-entidade',
  templateUrl: './pergunta-entidade.component.html',
  styleUrls: ['./pergunta-entidade.component.css']
})
export class PerguntaEntidadeComponent implements OnInit {
  @Input() perguntas: Perguntas;
  @Input() coletas: ColetaAlternativa[];
  @Input() dadosSelecao: PerguntaAlternativa[];
  @Input() disable: boolean;
  @Input() multimidia: Multimidia[] = [];

  multiLinha: boolean = false;
  resposta: string = null;
  eventResposta = new EventEmitter<string>();
  idColeta: number = null;
  mostrar: boolean = false;
  
  constructor() { }

  ngOnInit() {
    this.idColeta = this.coletas[0].idColeta;
    if( this.dadosSelecao[0].respostaMultiLinha == true )
    {
      this.multiLinha = true;
    }  
    var resp = this.coletas.find( x => x.idPergunta == this.perguntas.id  );

    if ( resp && resp.entidade ) 
    {
      this.resposta = resp.entidade.descricao;

      this.eventResposta.emit( this.resposta );
      resp = null;
    }

    var ret = this.multimidia.find( m => m.idPergunta == this.perguntas.id );
    if( ret != null )
    {
      this.mostrar = true;
    }
  }
}
