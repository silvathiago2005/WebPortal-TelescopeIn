import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TipoEntidade } from "../models/TipoEntidade.model";
import { Entidade } from "../models/Entidade.model"
import { Observable } from "rxjs";
import { GetAllTipoEntidade, SaveUpdateTipoEntidade, GetAllEntidades, SaveUpdateEntidade, GetAllEntidadesPai, TipoEntidadeById } from "../app.api";
import { SearchEntidadeAdvanced } from "../models/searchEntidadeAdvanced.model";


@Injectable()
export class EntidadeService{
    
    constructor(private http: HttpClient){}

    GetTipoEntidadeById(idTipoEntidade: number) : Observable<TipoEntidade>{
        return this.http.post<TipoEntidade>(`${TipoEntidadeById}`, +idTipoEntidade)
    }
    GetAllTipoEntidade(idUsuario: number) : Observable<TipoEntidade[]>{
       return  this.http.post<TipoEntidade[]>(`${GetAllTipoEntidade}`, idUsuario);
    } 

    SaveUpdateTipoEntidade(tipoEntidade: TipoEntidade) : Observable<number>{
        return this.http.post<number>(`${SaveUpdateTipoEntidade}`, tipoEntidade);
    }

    GetAllEntidade(searchEntidade: SearchEntidadeAdvanced) : Observable<any[]>{
        return this.http.post<any[]>(`${GetAllEntidades}`, searchEntidade);
    }

    GetAllEntidadesPai(idTipoEntidade: number) : Observable<Entidade[]>{
        return this.http.post<Entidade[]>(`${GetAllEntidadesPai}`, +idTipoEntidade );
    }

    SaveUpdateEntidade(entidade: Entidade) : Observable<string>{
        return this.http.post<string>(`${SaveUpdateEntidade}`, entidade);
    }

}