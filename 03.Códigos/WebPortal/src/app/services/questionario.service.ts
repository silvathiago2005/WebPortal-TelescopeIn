import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Questionario, QuestionarioRetorno } from "../models/questionario.model";
import { GetAllQuestionariosByUser_Api, GetAllQuestionarios_Api, GetAll_Api, GetAllQuestionarioIdDescricao, GetAllQuestionariosByQuestionario_Api } from "../app.api";
import { AuthService } from "./auth.service";


@Injectable()
export class QuestionarioService{
    constructor(private http: HttpClient, private auth: AuthService){}

    GetAll(): Observable<Questionario[]>{
        return this.http.post<Questionario[]>(`${GetAll_Api}`,'')
    }

    GetAllColetaByUser(idUser: number): Observable<any>{
        return this.http.get<any>(`${GetAllQuestionariosByUser_Api}/${idUser}`)
    }

    GetAllColetaByQuestionario(idUser: number, idQuestionario: number): Observable<any>{
        return this.http.get<any>(`${GetAllQuestionariosByQuestionario_Api}/${idQuestionario}/GetAllByUser/${idUser}`)
    }

    GetAllQuestionarioByIdCliente(): Observable<Questionario[]>{
        return this.http.get<Questionario[]>(`${GetAllQuestionariosByUser_Api}/${this.auth.getUser().idUsuario}`)
    }

    GetAllQuestionarioIdDescricao(): Observable<QuestionarioRetorno[]>{
        return this.http.post<QuestionarioRetorno[]>(`${GetAllQuestionarioIdDescricao}`, this.auth.getUser().idUsuario)
    }

    GetAllQuestionarioByIdProject(idProjeto: number[]):Observable<Questionario[]>{
        return this.http.post<Questionario[]>(`${GetAllQuestionarios_Api}`, idProjeto)
    }
}