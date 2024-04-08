import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ColetaAlternativa } from '../../../models/coleta.model';
import { Perguntas } from 'src/app/models/secaoPerguntas.model';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  @Input() perguntas: Perguntas;
  @Output() rated = new EventEmitter<number>();
  @Input() rate: number = 0;
  @Input() length: number = 0;
  @Input() coletas: ColetaAlternativa[];
  @Input() multimidia: Multimidia[] = [];

  //variavel que sera usada para guardar temporariamente o valor do rate conforme passe o mouse sobre as estrelas
  previousRate: number;
  rates: number[] = [1, 2, 3, 4, 5];
  idColeta: number = null;
  mostrar: boolean = false;

  constructor() {}

  ngOnInit() {
    this.idColeta = this.coletas[0].idColeta

    var ret = this.multimidia.find(m => m.idPergunta == this.perguntas.id);
    if(ret != null)
    {
      this.mostrar = true;
    }
  }

  setRate(r: number) {
    this.rate = r
    this.previousRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(r: number) {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate
    }
    this.rate = r
  }

  clearTemporaryRate() {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate
      this.previousRate = undefined
    }
  }

}
