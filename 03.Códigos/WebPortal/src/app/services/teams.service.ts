import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Team } from "../models/team.model";
import { GetAllEquipeUsuario_API, TeamUpdate_API, TeamAdd_API, TeamDelete_API,GetAllEquipes_API, AccessGroup_Api, GetAllEquipesByProjeto } from "../app.api";
import { TeamAdd } from "../models/teamAdd.model";
import { GrupoAcesso } from "../models/grupoAcesso.model";
import { AuthService } from "./auth.service";

@Injectable()
export class TeamService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getAllTeamsToUser():Observable<Team[]>{
        return this.http.post<Team[]>(`${GetAllEquipeUsuario_API}`, this.auth.getUser().idUsuario)
    }

    getTeamToUserId(): Observable<Team[]> {
        return this.http.post<Team[]>(`${GetAllEquipes_API}`, this.auth.getUser().idUsuario)
    }

    getAllEquipesByProjeto(idProjeto: number[]): Observable<Team[]>{
        return this.http.post<Team[]>(`${GetAllEquipesByProjeto}`, idProjeto)
    }

    getAllAccessGroup(): Observable<GrupoAcesso[]>{
        return this.http.post<GrupoAcesso[]>(`${AccessGroup_Api}`, null)        
    }

    postAddTeam(team: TeamAdd): Observable<any> {
        return this.http.post<Team>(`${TeamAdd_API}`, team)
            .pipe(map(team => team.Id))
    }

    putTeam(team: Team): Observable<any>{
        return this.http.post(`${TeamUpdate_API}/${this.auth.getUser().idUsuario}`,team)
    }

    deleteTeam(team: Team): Observable<any>{
        return this.http.post(`${TeamDelete_API}`,team)
    }
}