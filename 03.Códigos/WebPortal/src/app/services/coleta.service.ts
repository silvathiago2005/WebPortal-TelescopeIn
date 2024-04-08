import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BuscaColeta } from "../models/buscaColeta.model";
import { GetAllColetas, GetAllRespostasColetas, SaveBusca, GetAllBuscaSalva, AvaliarColeta, PegarAvaliacao, GetPDF } from "../app.api";
import { Coleta } from "../models/coleta.model";
import { BuscaSalva, BuscaSalvaVM } from "../models/buscaSalva.model";
import { AuthService } from "./auth.service";
import { ColetaAvaliacao } from "../models/coleta.avaliacao.model";
export type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

@Injectable()

export class ColetaService{
    constructor(private http: HttpClient, private auth: AuthService){}

    GetAll(filter: BuscaColeta): Observable<any[]>{
        return this.http.post<any[]>(`${GetAllColetas}`,filter);
    }

    GetAllRespostasColeta(idColeta: number): Observable<Coleta> {
        return this.http.post<Coleta>(`${GetAllRespostasColetas}`, idColeta);
    }

    SaveBuscaColeta(saveBuscaColeta: BuscaSalva): Observable<BuscaSalva>{
        return this.http.post<BuscaSalva>(`${SaveBusca}`, saveBuscaColeta);
    }

    GetAllBuscaSalva(): Observable<BuscaSalvaVM>{
        var idUsuario = this.auth.getUser().idUsuario;
        return this.http.post<BuscaSalvaVM>(`${GetAllBuscaSalva}`, idUsuario);
    }

    DeleteBuscaSalva(buscaSalva: BuscaSalva): Observable<BuscaSalva>{
        return this.http.post<BuscaSalva>(`${SaveBusca}`, buscaSalva);
    }

    AtualizaBuscaSalva(buscaSalva: BuscaSalva): Observable<BuscaSalva>{
        return this.http.post<BuscaSalva>(`${SaveBusca}`, buscaSalva);
    }

    AvaliarColeta(avaliacao: ColetaAvaliacao) : Observable<any>{
        return this.http.post<any>(`${AvaliarColeta}`, avaliacao);
    }

    PegarAvaliacao(idColeta: number): Observable<ColetaAvaliacao>{
        return this.http.post<ColetaAvaliacao>(`${PegarAvaliacao}`, idColeta);
    }

    GetPdf(idColeta: number): Observable<string>{
        return this.http.post<string>(`${GetPDF}`, idColeta);
    }

}