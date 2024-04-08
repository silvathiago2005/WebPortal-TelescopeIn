export class Entidade{
    constructor(
        public id: number,
        public IDTipoEntidade: number,
        public IDEntidadePai: number,
        public CodExterno: string,
        public Descricao: string,
        public Ativo: boolean,
        public entidadeCampos: EntidadeCampo[],
        public DtInclusao: Date,
        public DtAlteracao: Date
    ){}
}

export interface EntidadeRetorno{
    id: number,
    idTipoEntidade: number,
    idEntidadePai: number,
    codExterno: string,
    descricao: string,
    ativo: boolean,
    dtInclusao: Date,
    dtAlteracao: Date
}

export class EntidadeCampo{
    constructor(
        public id: number,
        public idEntidade: number,
        public idTipoEntidadeCampo: number,
        public valor?: string
    ){}
}