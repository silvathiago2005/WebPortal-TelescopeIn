import { EntidadeRetorno } from "./Entidade.model";
import { Multimidia } from "./coleta.multimidia.model";

export interface Coleta {
    idColeta: number,
    coletaAlternativa: ColetaAlternativa[],
    coletaMultimidia: Multimidia[]
}

export interface ColetaAlternativa {
    idColeta: number,
    protocolo: string,
    idPergunta: number,
    idPerguntaAlternativa: number,
    respostaDescritiva: string,
    caminhoFoto: string,
    protocoloAlternativaPai: string,
    idColetaAlternativaPai: number,
    entidade: EntidadeRetorno,
    chave: string,
    isPai: boolean,
    coleta: string,
    pergunta: string,
    perguntaAlternativa: string,
    coletasFilhas: string[],
    id: number,
    isNew: boolean
}