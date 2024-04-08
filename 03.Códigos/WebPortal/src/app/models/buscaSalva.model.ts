export class BuscaSalva{
    constructor(
        public id: number = null,
        public idUsuario: number = null,
        public nomeBusca: string = null,
        public jsonBusca: string = null,
        public dtInclusao: Date = null,
        public dtAlteracao: Date = null,
        public ativo: boolean = true
    ){}
}

export class BuscaSalvaVM{
    constructor(
        public idUsuario: number = null,
        public buscaSalva: BuscaSalva[] = []
    ){}
}