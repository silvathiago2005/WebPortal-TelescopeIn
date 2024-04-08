export class Operacional{
    constructor(
        public idQuestionario: number = 0,
        public iDTipoGrafico: number = 0,
        public TipoGrafico: number = 0,
        public DataInicial: string = null,
        public DataFinal: string = null
    ){}
}

export class RetornoHighcharts{
    constructor(
        public chart: string = null,
        public title: string = null,
        public x_Axis: string[] = [],
        public y_Axis: string[] = [],
        public series: Series[] = []
    ){}
}

export class Series{
    constructor(
        public name: string = null,
        public data: number[] = []
    ){}
}

export class SeriesPie{
    constructor(
        public name: string = null,
        public y: number = null,
        public sliced?: boolean,
        public selected?: boolean
    ){}
}

export class Selecionado{
    constructor(
        public name: string = '',
        public y: number = +'',
        public slice: boolean = false,
        public selected: boolean = false
    ){}
}

export class NaoSelecionado{
    constructor(
        public name: string = null,
        public y: number = +''
    ){}
}

export class FiltrosSalvos{
    constructor(
        public idQuestionario: number = null,
        public dataInicial: string = null,
        public dataFinal:string = null,
        // public dataInicial?: Date,
        // public dataFinal?: Date,
        public idDashboard?:number
    ){}
}
