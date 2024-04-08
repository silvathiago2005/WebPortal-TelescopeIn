export class ExecutarRelatorio{
    constructor(
        public idQuestionario: number = null,
        public idRelatorio: number = null,
        public parametrosRelatorio: parametrosRelatorio[] = []
    ){}
}

export class parametrosRelatorio{
    constructor(
        public sigla: string = null,
        public valor: string = null,
        public tipoParametro: number = null
    ){}
}