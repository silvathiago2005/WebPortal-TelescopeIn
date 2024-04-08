import { Component, OnInit, Input } from '@angular/core';
import { Multimidia, Video } from 'src/app/models/coleta.multimidia.model';
import { ColetaService } from 'src/app/services/coleta.service';
import { NgxGalleryImage, INgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-multimidia',
  templateUrl: './multimidia.component.html',
  styleUrls: ['./multimidia.component.css']
})
export class MultimidiaComponent implements OnInit {
  @Input() idColeta: number = null;
  @Input() idPergunta: number = null;
  @Input() sync: boolean = false;
  @Input() multimidia: Multimidia[] = [];
  multimidiaFotos: Multimidia[] = [];
  multimidiaVideos: Multimidia[] = [];
  multimidiaAudios: Multimidia[] = [];
  multimidiaAssinatura: Multimidia[] = [];

  carregando: boolean = false;
  multimidias: Multimidia[] = [];
  galleryImages: NgxGalleryImage[] = [];
  videos: Video[] = [];
  mostrarAudio: boolean = false;

  constructor() { }

  ngOnInit() {
    for(var x in this.multimidia)
    {
      if( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 1 && this.multimidia[x].ativo == true )
      {
        this.multimidiaFotos.push(this.multimidia[x]);
      }
      else if( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 2 && this.multimidia[x].ativo == true )
      {
        this.multimidiaVideos.push(this.multimidia[x]);
      }
      else if( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 3 && this.multimidia[x].ativo == true )
      {
        this.multimidiaAudios.push(this.multimidia[x]);
      }
      else
      {
        this.multimidiaAssinatura.push(this.multimidia[x]);
      }
    }
  }

}
