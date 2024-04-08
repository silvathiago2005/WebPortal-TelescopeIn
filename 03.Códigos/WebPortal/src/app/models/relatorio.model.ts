import { RelatorioParametro } from "./parametros.relatorio.model";

export class Relatorio{
    constructor(
        public id: number = null,
        public idQuestionario: number = null,
        public nomeRelatorio: string = null,
        public relatorioParametro: RelatorioParametro[] = [],
        public scriptSql: string = null,
        public ativo?: boolean,
        public dtAlteracao?: Date,
        public dtInclusao?: Date,
        public isNew?: boolean,
        public isGeneric?: boolean
    ){}
}

export interface RelatorioRetorno{
    id: number,
    idQuestionario: number,
    nomeRelatorio: string,
    relatorioParametro: RelatorioParametro[],
    scriptSql: string,
    ativo?: boolean,
    dtAlteracao?: Date,
    dtInclusao?: Date,
    isNew?: boolean,
    isGeneric?: boolean
}
