import { Injectable } from '@angular/core';
import { ToastrNotification } from './toastr.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService{
    mensagem: string
    titulo: string 

    constructor(private notification: ToastrNotification, private translate: TranslateService){}

    MostrarNotificacaoSucesso(mensagem: string, titulo: string){
        this.translate.get(mensagem).subscribe(x => this.mensagem = x)
        this.translate.get(titulo).subscribe(x => this.titulo = x)
        
        this.notification.showSuccess(this.mensagem, this.titulo)
    }

    MostrarNotificacaoInfo(mensagem: string, titulo: string){
        this.translate.get(mensagem).subscribe(x => this.mensagem = x)
        this.translate.get(titulo).subscribe(x => this.titulo = x)

        this.notification.showInfo(this.mensagem, this.titulo)
    }

    MostrarNotificacaoErro(mensagem: string, titulo:string){
        this.translate.get(mensagem).subscribe(x => this.mensagem = x)
        this.translate.get(titulo).subscribe(x => this.titulo = x)

        this.notification.showError(this.mensagem, this.titulo)
    }

    MostrarNotificacaoWarning(mensagem: string, titulo:string){
        this.translate.get(mensagem).subscribe(x => this.mensagem = x)
        this.translate.get(titulo).subscribe(x => this.titulo = x)

        this.notification.showWarning(this.mensagem, this.titulo)
    }
}