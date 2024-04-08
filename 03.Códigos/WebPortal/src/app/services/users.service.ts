import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, changePassword } from "../models/Users.model";
import { GetAllUsuariosByEquipe, NewUser_Api, DeleteUser_Api, Usuario_Api, TrocarSenha } from "../app.api";
import { EquipeUsuario, Team } from "../models/team.model";
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    // chama a api que retorna os usuários que não estão vinculados a equipe
    getAllUsersCustomer(idCliente: number, idEquipe: number): Observable<User[]> {
        return this.http.post<User[]>(`${Usuario_Api}/${idEquipe}/EquipeUsuario`, idCliente)
    }

    trocarSenha( changePassword: changePassword ): Observable<any> {
        return this.http.post<any>(`${TrocarSenha}`, changePassword);
    }

    // chama a api que retorna os usuários que estão vinculados a equipe
    getAllUsersAddEquipe(idCliente: number,idEquipe: string): Observable<User[]> {
        return this.http.post<User[]>(`${Usuario_Api}/${idEquipe}`, idCliente)
    }

    getAllUserByCustomerId(): Observable<User[]>{
        return this.http.post<User[]>(`${Usuario_Api}`, this.auth.getUser().idCliente)
    }

    // api que faz a adicição dos usuarios na equipe
    postUsersAddEquipe(idEquipe: string, usuariosAdicionados: User[]): Observable<EquipeUsuario> {
        return this.http.post<EquipeUsuario>(`${Usuario_Api}/${idEquipe}/AddUsuarioEquipe`, usuariosAdicionados)
    }

    postNewUsuario(usuario: User): Observable<any> {
        return this.http.post<any>(`${NewUser_Api}`, usuario)
    }

    updateUsuario(usuario: User): Observable<any> {
        return this.http.post<any>(`${NewUser_Api}`, usuario)
    }

    getAllUsuariosByEquipe(idEquipe: number[]): Observable<User[]>{
        return this.http.post<User[]>(`${GetAllUsuariosByEquipe}`, idEquipe)
    }

    // retorna todos as equipes pelo id do usuario e cliente
    getAllTeamsByUserAndCustomer(usuario: number): Observable<Team[]> {
        return this.http.post<Team[]>(`${Usuario_Api}/GetAllTeamsByUserAndCustomer`, usuario)
    }

    // retorna todas as equipes que o usuario esteja relacionado
    getAllTeamsAddUser(usuario: number): Observable<Team[]> {
        return this.http.post<Team[]>(`${Usuario_Api}/GetAllTeamsByUser/`, usuario)
    }

    // atualiza as equipes que o cliente foi ou não relacionado
    SaveTeamAddUser(UserID: number,equipe: Team[]){
        return this.http.post<any>(`${Usuario_Api}/${UserID}/SaveTeamAddUser`, equipe)
    }

    DeleteUser(usuario: User): Observable<any>{
        return this.http.post<any>(`${DeleteUser_Api}`, usuario)
    }
}