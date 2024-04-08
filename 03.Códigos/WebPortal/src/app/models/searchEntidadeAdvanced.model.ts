export class SearchEntidadeAdvanced{
    constructor(
        public IDTipoEntidade: number[] = [],
        public CodExterno: string = null,
        public Descricao: string = null,
        public Ativo: string = null,
        public PageSize: number = null,
        public PageIndex: number = null,        
    ){}
}