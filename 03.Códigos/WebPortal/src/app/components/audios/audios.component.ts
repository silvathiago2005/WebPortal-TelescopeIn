import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';

declare var $: any;

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit, OnDestroy {
  AudioTitle: string = null;
  @Input() multimidia: Multimidia[] = [];
  @Input() idPergunta?: number = null;
  @Input() audioUrl?: string = null;
  mostrarMensagem: boolean = false;
  audio = new Audio();

  constructor() { }

  ngOnInit() { 
    this.audio = new Audio();

    if ( this.audioUrl == 'audio nao sincronizado' )
    {
      this.mostrarMensagem = true;
    }
    else if ( this.audioUrl == 'não tem audio' )
    {
      this.audio.src = '';
    }
    else
    {
      this.audio.src = this.audioUrl
    }

    if( this.multimidia )
    {
      this.setarAudio();
    }

    $('#modalPerguntas').on('hide.bs.modal', function(){//captura o momento do fechar da modal e pausa o audio
      $('audio').each(function(){
        this.pause();
      })
    })
  }

  pausaAudio()
  {
    this.audio.src = '';
  }

  setarAudio(){
    for( var x in this.multimidia )
    {
      if( this.multimidia[x].tipoMidia == 3 && this.multimidia[x].sync == true && this.multimidia[x].idPergunta == this.idPergunta )
      {
        this.audio.src = this.multimidia[x].caminhoUrl;
      }
      else
      {
        this.mostrarMensagem = true;
      }
    }
  }

  ngOnDestroy()
  {
    console.log();
  }
}
