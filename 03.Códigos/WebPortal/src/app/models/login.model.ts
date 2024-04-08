export class Login {
        constructor(
                public nome: string = null,
                public Email: string = null,
                public Senha: string = null,
                public idCliente: number = null,
                public idUsuario: number = null,
                public idGrupo: number = null
        ) { }
}

export class LoginTemp {
        constructor(
                public UserEmail: string = null,
                public Password: string = null
        ) { }
}

export interface UserLogin {
        success: boolean,
        usuario: usuario       
}

export interface usuario{
        id: number,
        nome: string,
        login: string,
        senha: string,
        email: string,
        idCliente: number,
        dtInclusao: Date,
        dtAlteracao: Date,
        ativo: boolean,
        idGrupo?: number,
        equipes?: any[]
}