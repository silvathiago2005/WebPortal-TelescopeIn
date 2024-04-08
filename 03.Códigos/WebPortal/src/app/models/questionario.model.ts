export interface Questionario{
    idProjeto: number
    descricao: string
    ativo: boolean
    idQuestionarioRef: number
    versão: number
    dtInicioVigencia: Date
    dtFimVigencia: Date
    id: number
    isNew: boolean
}

export interface QuestionarioRetorno{
    idQuestionario: number,
    descricao: string
}