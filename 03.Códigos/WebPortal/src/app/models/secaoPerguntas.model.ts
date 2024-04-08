export interface SecaoPerguntas{
    idQuestionario: number,
    nome: string,
    idTipoSecao: number,
    sequencia: number,
    descricao: string,
    conteudoInformativo: string,
    perguntas: Perguntas[],
    id: number,
    isNew: boolean
}

export interface Perguntas{
    idQuestionario: number,
    idTipoPergunta: number,
    numero: string,
    descricao: string,
    orientacao: string,
    observacao: string,
    exibirImagem: boolean,
    ativo: boolean,
    coletarObservacao: boolean,
    coletarFoto: boolean,
    idSecaoPergunta: number,
    sequencia: number,
    obrigatoria: boolean,
    coletaAlternativas: string[], //ver se realmente será essa definição
    perguntaAlternativas: PerguntaAlternativa[],
    perguntaConfigs: PerguntaConfig[],
    questionarioWorkflows: string[], //ver se realmente será essa definição
    questionarioWorkflowProximaPerguntas: string[],//ver se realmente será essa definição
    id: number,
    isNew: boolean,
    numeroDescricao: any
}

export interface PerguntaAlternativa{
    idPergunta: number,
    descricao: string,
    imagem: string,
    posicaoLinha: number,
    posicaoColuna: number,
    respostaMultiLinha: boolean,
    coletaAlternativas: string[],//ver se realmente será essa definição
    idTipoAlternativa: number,
    id: number,
    isNew: boolean,
    isCabecacho: boolean,
    habilitarSelecao: string,
    desabilitarSelecao: string,
    opcaoDescritiva: boolean
}

export interface PerguntaConfig{
    id: number,
    idPergunta: number,
    ativo: boolean,
    chave: string,
    dtAlteracao: Date,
    dtInclusao: Date,
    isNew: boolean,
    valor: string
}