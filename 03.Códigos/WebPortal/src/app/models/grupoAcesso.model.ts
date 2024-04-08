import { User } from "./Users.model";

export interface GrupoAcesso{
    id: number
    nome: string
    ativo: boolean
    grupoAcesso: User[]
}