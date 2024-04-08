import { Component, OnInit, Input } from '@angular/core';
import { Video, Multimidia } from 'src/app/models/coleta.multimidia.model';

declare var $: any;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  @Input() multimidias: Multimidia[] = [];
  @Input() idPergunta: number = null;

  videos: Video[] = [];
  name: string = null;
  caminhoFotoRelogio: string = '../../assets/Logo/reloginho.png';
  mensagem: string = 'video ainda não sincronizada';

  constructor() { }

  ngOnInit() {
    for (let x in this.multimidias) {
      var video: Video = new Video();
      if ( this.multimidias[x].idPergunta == this.idPergunta && this.multimidias[x].tipoMidia == 2 && this.multimidias[x].sync == true ) {
        video.Observacao = this.multimidias[x].observacao;
        video.VideoUrl = this.multimidias[x].caminhoUrl;
        this.videos.push(video);
      }
      else if ( this.multimidias[x].idPergunta == this.idPergunta && this.multimidias[x].tipoMidia == 2 && this.multimidias[x].sync == false )
      {
        video.Observacao = this.mensagem;
        video.VideoUrl = this.caminhoFotoRelogio;

        this.videos.push(video);
      }     
    }
  }  

}
