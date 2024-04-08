export interface BuscaPesquisaPerguntasSend{
        NomeBuscaPesquisa: string,
        idQuestionarioSelecionado: number,
        BuscaPesquisa: BuscaPesquisaSend[]
}

export interface BuscaPesquisaSend{
    idPergunta: number,
    tipoOperacao: number,
    selecionados: number[],
    selecionadosNao: number[],
    resposta: string,
    respostaMaior: string,
    idTipoPergunta: number
}

export class BuscaPesquisaPerguntas{
    constructor(
        public NomeBuscaPesquisa: string = null,
        public idQuestionarioSelecionado: number = null,
        public BuscaPesquisa: BuscaPesquisa[] = []
    ){}
}

export class BuscaPesquisa{
    constructor(
       public idPergunta: number = null,
       public tipoOperacao: number = null,
       public selecionados: number[] = [],
       public selecionadosNao: number[] = [],
       public resposta: string = null,
       public respostaMaior: string = null,
       public idTipoPergunta: number = null
    ){}
}

export class BuscaPesquisaFront{
    constructor(
       public idPergunta: number = null,
       public perguntaAlternativaDescricao: string = null,
       public tipoOperacao: string = null,
       public descricaoResposta: string[] = [],
       public descricaoRespostaNao: string[] = [],
       public selecionadoSim: number[] = [],
       public selecionadoNao: number[] = [],
       public resposta: string = null,
       public respostaMaior: string = null,
       public idTipoPergunta: number = null
    ){}
}