import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrNotification } from "./services/toastr.service";
import { tap } from 'rxjs/operators'
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ExecutarRelatorio_Api } from "./app.api";


@Injectable()
export class MyCustomHeaderInterceptor implements HttpInterceptor {

    constructor(private notification: ToastrNotification, private translate: TranslateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var verifica = request.url.split('=')
        if(verifica[0] == "http://maps.googleapis.com/maps/api/geocode/json?address") return next.handle(request)
        
        const myRequest = request.clone({ setHeaders: { 'ZUMO-API-VERSION': '2.0.0' } })

        return next.handle(myRequest)
            .pipe(tap((event: HttpEvent<any>) =>{},
                erro => {
                    let titulo: string
                    let frase: string
                    let erroRelatorio: string
                    let erroGenerico: string
                    
                    if (erro instanceof HttpErrorResponse) {
                        let response = <HttpErrorResponse>erro;
                        
                        this.translate.get("Não foi possível executar o Relatório. Por favor, tente mais tarde ou contate o suporte!").subscribe(erro => erroRelatorio = erro)
                        this.translate.get("Não foi possível executar a ação. Por favor, tente mais tarde ou contate o suporte!").subscribe(erro => erroGenerico = erro)
                        frase = (response.status == 500 && response.url == `${ExecutarRelatorio_Api}`)? erroRelatorio: erroGenerico;                                                                                                    ;

                        this.translate.get("HttpErro").subscribe()
                        this.translate.get("Cuidado").subscribe(x => titulo = x)
                        if(response.status == 401){
                            this.notification.showError(response.message, titulo)
                        }
                        else if(response.status == 403){
                            this.notification.showError(response.message, titulo)
                        }
                        else if(response.status == 500){
                            this.notification.showError(frase, titulo)
                        }
                        else{
                            this.notification.showError(response.message, titulo)
                        }
                    }
                    else{
                        this.notification.showError(frase, titulo)
                    }
                }
            )
        )
    }
}