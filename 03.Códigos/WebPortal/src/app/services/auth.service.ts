import { Injectable } from "@angular/core";
import { Login, LoginTemp, UserLogin } from "../models/login.model";
import { NotificationService } from "./notification.service";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { LoginTemp_Api } from "../app.api";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private notification: NotificationService, private translate: TranslateService, private http: HttpClient) { }
    logado: boolean = false;
    users: Login[];
    user: Login;
    private Login = new LoginTemp();
    private name = 'name';
    
    getUser(): Login {
        var login = localStorage.getItem(this.name)

        return JSON.parse(login)
    }

    storeUser(login: Login) {
        var user = JSON.stringify(login);

        localStorage.setItem(this.name, user)
    }

    storePageSize(pagesize: number){
        var page = JSON.stringify(pagesize);

        localStorage.setItem("Page", page)
    }

    getPage(): number{
        var page = localStorage.getItem("Page")

        return JSON.parse(page)
    }

    removeUser = () => localStorage.removeItem(this.name)
    
    getLoginTemp(LoginTemp: LoginTemp): Observable<UserLogin>{
        return this.http.post<UserLogin>(`${LoginTemp_Api}`, LoginTemp)
    }
    
    authorize(email: string, password: string): UserLogin {        
        this.Login.UserEmail = email;
        this.Login.Password = password;

        var userLogin: any = null;

        if(this.logado){
            if (this.user.idUsuario == 86 || this.user.idUsuario == 134) { localStorage.setItem('language', 'es'); this.translate.use('es')}
            this.notification.MostrarNotificacaoSucesso(`Bem-vindo`, 'Sucesso')
            return userLogin
        } else {
            this.notification.MostrarNotificacaoInfo(`Desculpe, Usuário não encontrado!`, 'Cuidado')
            return null
        }
    }

    isLoggedin(): Login {
        var ret = this.getUser()
        
        if (ret) {
            return ret;
        }
        return null;
    }

    isLoggedinSuporte(): any{
        var ret = this.getUser().idUsuario

        if(ret){
            return ret
        }
        return null
    }
}

