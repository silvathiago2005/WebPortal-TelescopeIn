import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GetDadosChart, SaveUpdateLayout, GetDashboardsSalvos } from "../app.api";
import { Operacional, FiltrosSalvos } from "../models/dashboard.operacional.models";
import { DashboardLayout } from "../models/dashboard.layout";
import { AuthService } from "./auth.service";

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private auth: AuthService) { }

    posicao: string = null;
    filtrosSalvos: string = null;

    setFiltros(filtroSalvo: FiltrosSalvos) {
        this.filtrosSalvos = JSON.stringify(filtroSalvo);

        localStorage.setItem(this.auth.getUser().idUsuario.toString(), this.filtrosSalvos);
    }

    getFiltros(): FiltrosSalvos{
        var retorno = localStorage.getItem(this.auth.getUser().idUsuario.toString());
        var retornoFiltrosSalvos = JSON.parse(retorno);
        return retornoFiltrosSalvos;
    }

    setPosicao(widgets: any):any{
        this.posicao = JSON.stringify(widgets);
        return this.posicao;
    }

    getPosicao(): any{
        return this.posicao;
    }

    getPosicaoConvertida(): any{
        return JSON.parse(this.posicao);
    }

    // metodos para conexão as Apis
    GetDadosChart(operacional: Operacional): Observable<any> {
        return this.http.post<any>(`${GetDadosChart}`, operacional);
    }

    SaveUpdateDashboarLayout(dashboardLayout: DashboardLayout): Observable<any> {
        return this.http.post<any>(`${SaveUpdateLayout}`, dashboardLayout);
    }

    GetDashboardsSalvos(): Observable<DashboardLayout[]>{
        return this.http.post<DashboardLayout[]>(`${GetDashboardsSalvos}`, this.auth.getUser().idUsuario)
    }
}