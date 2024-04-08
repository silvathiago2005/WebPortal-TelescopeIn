export interface Customer{
    nome: string
    ativo: boolean
    dtInclusao: Date
    equipe: string[]
    projetos: string[]
    usuarioClientes: string[]
    id: number
    isNew: boolean
}

export class CustomerVM{
    constructor(
        public idCliente: number = 0
    ){}
}