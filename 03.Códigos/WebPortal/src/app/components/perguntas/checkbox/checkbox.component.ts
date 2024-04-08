import { Component, OnInit, Input } from '@angular/core';
import { Perguntas, PerguntaAlternativa } from '../../../models/secaoPerguntas.model';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html'
})

export class CheckboxComponent implements OnInit {

  @Input() perguntas: Perguntas;
  @Input() type: string = "pergunta";
  @Input() coletas: ColetaAlternativa[];
  @Input() dadosSelecao: PerguntaAlternativa[];
  @Input() multimidia: Multimidia[];
  
  idColeta: number = null
  mostrar: boolean = false;
  disabled: boolean = true
  
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
