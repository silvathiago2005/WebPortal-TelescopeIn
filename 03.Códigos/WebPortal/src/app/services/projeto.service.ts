import { Injectable } from "@angular/core";
import { Projeto } from "../models/Projeto.model";
import { AllProjects_Api, AllProjectsCustomer_Api, GetAllProjetoAddEquipe, GetAllProjetoByEquipe } from "../app.api";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { EquipeProjeto } from "../models/team.model";
import { AuthService } from "./auth.service";

@Injectable()
export class ProjetoService {
    constructor(private http: HttpClient, private auth: AuthService) { }

    GetAllProjetos(): Observable<Projeto[]> {
        return this.http.post<Projeto[]>(`${AllProjectsCustomer_Api}`, this.auth.getUser().idUsuario)
    }

    // retorna todos os projeto do cliente
    GetAllProjetosByEquipe(idEquipe: number): Observable<Projeto[]> {
        return this.http.post<Projeto[]>(`${GetAllProjetoByEquipe}`, idEquipe)
    }

    // retorna todos os projetos adicionados na equipe
    GetAllProjetosAddEquipe(idEquipe: number): Observable<Projeto[]> {
        return this.http.post<Projeto[]>(`${GetAllProjetoAddEquipe}`, idEquipe)
    }

    PostEquipeAddProjeto(idEquipe: string, ProjetosAdicionados: Projeto[]): Observable<EquipeProjeto> {
        return this.http.post<EquipeProjeto>(`${AllProjects_Api}/${idEquipe}/PostEquipeProjeto`, ProjetosAdicionados)
    }
}