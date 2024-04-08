import { Component, OnInit, Input } from '@angular/core';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.component.html',
  styleUrls: ['./assinatura.component.css']
})
export class AssinaturaComponent implements OnInit {
  @Input() multimidia: Multimidia[] = [];
  @Input() idPergunta: number = null;

  assinatura: string = null;
  mostrarImagem: string = null;
  image = new Image();
  caminhoFotoRelogio: string = '../../assets/Logo/relogio.png';
  mensagem: string = 'imagem ainda não sincronizada';
  observacao: string = null;
  sincronizada: boolean = true;

  constructor() { }

  ngOnInit() {
    for ( var x in this.multimidia ) {
      if ( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 4 && this.multimidia[x].sync == true ) {
        this.assinatura = this.multimidia[x].caminhoUrl;
      }
      else if( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 4 && this.multimidia[x].sync == false )
      {
        this.assinatura = this.caminhoFotoRelogio;
        this.observacao = this.mensagem;

        this.sincronizada = false;
      };
    };
  }

}
