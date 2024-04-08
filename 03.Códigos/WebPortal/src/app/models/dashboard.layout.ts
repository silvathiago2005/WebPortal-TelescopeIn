export class DashboardLayout{
    constructor(
        public id: number = 0,
        public idUsuario: number = 0,
        public idQuestionario: number = 0,
        public dataInicial?: Date,
        public dataFinal?: Date,
        public nome: string = null,
        public layout: string = null,
        public tipo: string = null,
        public dtInclusao: Date = null,
        public dtAlteracao: Date = null,
        public ativo: boolean = false
        ){}
}