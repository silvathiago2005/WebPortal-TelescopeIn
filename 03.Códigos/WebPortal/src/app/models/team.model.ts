import { Customer } from "./Customer.model";

export interface Team {
    IDCliente: number
    Nome: string
    Ativo: boolean
    Cliente: Customer
    Coletas: string[]
    DtInclusao: Date
    DtAtualizacao: Date
    EquipeProjetos: EquipeProjeto[]
    EquipeUsuarios: EquipeUsuario[]
    Id: number
    IsNew: boolean
}

export interface EquipeUsuario {
    nome: string
}

export interface EquipeProjeto {
    descricao: string
}