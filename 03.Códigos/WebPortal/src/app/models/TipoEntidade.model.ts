import { Entidade } from "./Entidade.model";

export class TipoEntidade{
    constructor(
        public idTipoEntidade: number,
        public idCliente: number,
        public idTipoEntidadePai: number,
        public descricao: string,
        public entidades: Entidade[],
        public tipoEntidadeCampos: TipoEntidadeCampo[] = [],
        public ativo: boolean,
        public dtInclusao: Date,
        public dtAlteracao: Date
    ){}
}

export class TipoEntidadeCampo{
    constructor(
        public id?: number,
        public idTipoEntidade?: number,
        public nome?: string,
        public codigo?: string,
        public tipo?: number,
        public ativo?: boolean,
        public obrigatorio?: boolean,
        public dtInclusao?: Date,
        public dtAlteracao?: Date        
    ){}
}