import { GeoLocalizaoFiltro } from "./geoLocalizaoFiltro.model";
import { Marker } from "./marker.modal";
import { BuscaPesquisaPerguntas } from "./buscaPesquisaPerguntas.model";

class BuscaColeta{
  constructor(
    public Id: number = null,
    public ColetaID?: number,
    public Projetos: number[] = [],
    public Equipes: number[] = [],
    public Usuarios: number[] = [],
    public Questionarios: number[] = [],
    public GeoLocalizaoFiltro: GeoLocalizaoFiltro[] = [],
    public BuscaPesquisaPerguntas: BuscaPesquisaPerguntas[] = [],
    public IDCliente: number= 0,
    public DataInicio: string = null,
    public DataFim: string = null,
    public DuracaoInicio: string = '00:00',
    public DuracaoFim: string = '23:59',
    public Ativo: boolean = null,
    public pageIndex: number = 1,
    public pageSize: number = 1000000,
    public sortField: string = 'string',
    public sortType: string = 'string',
    public search: string = 'string',
    public totalRows: number = 0,
    public marker: Marker[] = []
  ){}
}

export {BuscaColeta}