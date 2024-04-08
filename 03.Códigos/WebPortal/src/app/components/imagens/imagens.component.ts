import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation, INgxGalleryImage, NgxGalleryImageSize } from 'ngx-gallery';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

@Component({
  selector: 'app-imagens',
  templateUrl: './imagens.component.html',
  styleUrls: ['./imagens.component.css']
})
export class ImagensComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [{
    image: false,
    height: '100px',
    thumbnailsColumns: 8,
    imageAnimation: NgxGalleryAnimation.Slide,
    imageArrowsAutoHide: true,
    previewDownload: true,
    thumbnailsArrowsAutoHide: true,
    previewKeyboardNavigation: true,
    previewCloseOnClick: true
  },
  {
    breakpoint: 800,
    width: '100%',
    height: '200px',
    imagePercent: 75,
  },
  {
    breakpoint: 400,
    thumbnailsColumns: 4
  }]

  galleryImages: NgxGalleryImage[] = []

  @Input() idColeta: number = null
  @Input() multimidia: Multimidia[] = []
  @Input() idPergunta: number = null

  carregaFoto: boolean = true
  caminhoFotoRelogio: string = '../../assets/Logo/relogio.png';
  mensagem: string = 'imagem ainda não sincronizada';

  constructor() { }

  ngOnInit() {
    this.carregaFoto = true

    for (let x in this.multimidia) {
      var imagem: INgxGalleryImage = {small: '', medium: '', big: '', description: '' }

      if ( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 1 && this.multimidia[x].sync == true ) {
        imagem.small = this.multimidia[x].caminhoUrl
        imagem.medium = this.multimidia[x].caminhoUrl
        imagem.big = this.multimidia[x].caminhoUrl
        imagem.description = this.multimidia[x].observacao

        this.galleryImages.push(imagem)
      }  
      else if( this.multimidia[x].idPergunta == this.idPergunta && this.multimidia[x].tipoMidia == 1 && this.multimidia[x].sync == false )
      {
        imagem.small = this.caminhoFotoRelogio
        imagem.medium = this.caminhoFotoRelogio
        imagem.big = this.caminhoFotoRelogio
        imagem.description = this.mensagem

        this.galleryImages.push(imagem)
      }   
    }
    this.carregaFoto = false
  }

}
