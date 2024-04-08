import { Coleta } from "./coleta.model";

export class Multimidia{
    constructor(
        public id: number = null,
        public idColeta: number = null,
        public idPergunta: number = null,
        public tipoMidia: number = null,
        public caminhoUrl: string = null,
        public ativo: boolean = false,
        public coleta: Coleta = null,
        public dtInclusao: Date = null,
        public dtAlteracao: Date = null,
        public dtAquisicao: Date = null,
        public observacao: string = null,
        public isNew: boolean = false,
        public protocolo: string = null,
        public protocoloColeta: string = null,
        public sync: boolean = false
    ){}
}

export class Video{
    constructor(
        public Observacao: string = null,
        public VideoUrl: string = null
    ){}
}