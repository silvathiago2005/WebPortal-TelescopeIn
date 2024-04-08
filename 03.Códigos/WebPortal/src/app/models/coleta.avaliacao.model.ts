export class ColetaAvaliacao{
    constructor(
        public id: number = null,
        public idColeta: number = null,
        public nota: number = null,
        public observacao: string = null,
        public dtInclusao?: Date,
        public dtAlteracao?: Date,
        public idUsuario?: number
    ){}}