export class RelatorioParametro{
    constructor(
        public id?: number,
        public idRelatorio?: number,
        public sigla: string = null,
        public nomeParametro: string = null,
        public tipoParametro: number = null,
        public valor?: string
    ){}
}