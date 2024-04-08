export interface BuscaColetaRetorno{
    itens: [{
        idColeta: number,
        protocolo: string,
        dtInicio: Date,
        dtTermino: Date,
        idUsuario: number,
        nomeUsuario: string,
        idEquipe: number,
        nomeEquipe: string,
        idQuestionario: number,
        descQuestionario: string,
        idProjeto: number,
        descProjeto: string,
        versaoApp: string,
        ativo: boolean,
        latitude: number,
        longitude: number,
        dtInclusao: Date,
        duracao: string,
        id: number,
        isNew: boolean
    }]
        totalpages: number,
        totalrecords: number
}