import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SaveRelatorio_Api, GetAllByUser_Api, GetAllParametrosByRelatorio_Api, GetRelatorio_Api, ExecutarRelatorio_Api } from "../app.api";
import { Observable } from "rxjs";
import { Relatorio } from "../models/relatorio.model";
import { AuthService } from "./auth.service";
import { RelatorioParametro } from "../models/parametros.relatorio.model";
import { ExecutarRelatorio } from "../models/executar.relatorio.model";
import { RelatorioRetorno } from "../models/relatorio.resposta.model";

@Injectable()

export class RelatorioService {
    constructor(private http: HttpClient, private auth: AuthService) { }

    SaveRelatorio(relatorio: Relatorio): Observable<boolean>{
      return this.http.post<boolean>(`${SaveRelatorio_Api}`, relatorio)
    }

    GetAllByUser(): Observable<Relatorio[]>{
      return this.http.post<Relatorio[]>(`${GetAllByUser_Api}`, this.auth.getUser().idUsuario)
    }

    GetAllParametrosByRelatorio(idRelatorio: number): Observable<RelatorioParametro[]>{
      return this.http.post<RelatorioParametro[]>(`${GetAllParametrosByRelatorio_Api}`, idRelatorio)
    }

    GetRelatorio(idRelatorio: number): Observable<Relatorio>{
      return this.http.post<Relatorio>(`${GetRelatorio_Api}`, idRelatorio)
    }

    ExecutarRelatorio(dadosRelatorio: ExecutarRelatorio): Observable<RelatorioRetorno>{
      return this.http.post<RelatorioRetorno>(`${ExecutarRelatorio_Api}`, dadosRelatorio)
    }
} 