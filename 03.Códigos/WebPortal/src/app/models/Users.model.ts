export interface User{
    Id: number,
    nome: string,
    login: string,
    senha: string,
    email: string,
    IDCliente?: number,
    dtInclusao?: Date,
    dtAlteracao?: Date,
    ativo: boolean,
    equipes: number[],
    grupoAcessoId: number
}

export class User{
    constructor(
        public Id: number = null,
        public nome: string = null,
        public login: string = null,
        public senha: string = null,
        public email: string = null,
        public cargo?: string,
        public IDCliente?: number,
        public dtInclusao?: Date,
        public dtAlteracao?: Date,
        public ativo: boolean = true,
        public equipes: number[] = [],
        public idGrupo: number = null
    ){}
}

export class changePassword{
    constructor(
        public idUser: number = null,
        public Password: string = null
    ){}  
}