import { Component, OnInit, NgZone, ViewChild, ElementRef, OnDestroy, EventEmitter, Input } from '@angular/core';
import { Projeto } from '../../models/Projeto.model';
import { ProjetoService } from '../../services/projeto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Questionario } from '../../models/questionario.model';
import { QuestionarioService } from '../../services/questionario.service';
import { Team } from '../../models/team.model';
import { User } from '../../models/Users.model';
import { TeamService } from '../../services/teams.service';
import { UserService } from '../../services/users.service';
import { PagedListService } from 'ng-paged-list/paged-list.service';
import { UserCustomer_Api, GetAllColetas } from '../../app.api';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { Marker } from '../../models/marker.modal';
import { GeoLocalizaoFiltro, GeoLocalizaoFiltroInt } from '../../models/geoLocalizaoFiltro.model';
import { BuscaColeta } from '../../models/buscaColeta.model';
import { ColetaService } from '../../services/coleta.service';
import { BuscaColetaRetorno } from '../../models/buscaColetaRetorno.model';
import { TranslateService } from '@ngx-translate/core';
import { Angular2CsvComponent } from 'angular2-csv';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SecaoPerguntas, Perguntas } from '../../models/secaoPerguntas.model';
import { Coleta, ColetaAlternativa } from '../../models/coleta.model';
import { forkJoin } from 'rxjs';
import { Login } from '../../models/login.model';
import { BuscaSalva, BuscaSalvaVM } from '../../models/buscaSalva.model';
import { BuscaPesquisaPerguntas, BuscaPesquisa, BuscaPesquisaPerguntasSend, BuscaPesquisaFront } from '../../models/buscaPesquisaPerguntas.model';
import { ColetaAvaliacao } from 'src/app/models/coleta.avaliacao.model';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { enableRipple } from '@syncfusion/ej2-base';
import { Multimidia } from 'src/app/models/coleta.multimidia.model';
import { map } from 'highcharts';



declare var require: any;
declare var $: any;

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/pt/ca-gregorian.json'),
    require('cldr-data/main/pt/numbers.json'),
    require('cldr-data/main/pt/timeZoneNames.json'),
    require('cldr-data/main/es/ca-gregorian.json'),
    require('cldr-data/main/es/numbers.json'),
    require('cldr-data/main/es/timeZoneNames.json')
);

enableRipple(true);

@Component({
    selector: 'app-coletas',
    templateUrl: './coletas.component.html',
    styleUrls: ['./coletas.component.css']
})

export class ColetasComponent implements OnInit, OnDestroy {
    rated: number = 0;
    @Input() rate: number = 0;
    @Input() length: number = 0;
    //variavel que sera usada para guardar temporariamente o valor do rate conforme passe o mouse sobre as estrelas
    previousRate: number;
    rates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    textArea: string = null;

    fitBounds: any ;

    public localeSet: string;
    public dateless: string;
    public timeless: string;

    buscaColetaRetorno: BuscaColetaRetorno[] = [];
    grid: PagedListService;
    gridSearchColeta: PagedListService;
    lat: number = -23.6756537;
    lng: number = -46.4920955;
    latitude: number = -23.6756537;
    longitude: number = -46.4920955;
    zoom: number = 14;
    radius: number = 3000;
    searchControl: FormControl;
    km: number = 5;
    geocalizacao = new GeoLocalizaoFiltro();
    listGeocalizacao = [];
    self = this;
    buscaColeta = new BuscaColeta();
    Ativo?: boolean = null;
    coletaAvaliacao: ColetaAvaliacao = new ColetaAvaliacao();
    audioUrl: string = null;
    coletaID: number = null;

    @ViewChild("search")
    // @ViewChild("mapa") map;

    public searchElementRef: ElementRef;
    place: any = null;

    dateFormat: string = 'dd/MM/yyyy';
    dateFormatInput: string = 'dd-MM-yyyy';
    dateFormatCabecalhoRespostas: string = 'yyyy/MM/dd';

    isalive: boolean = true;
    lang: string = 'en';
    perguntas: SecaoPerguntas[];
    coletas: Coleta;
    respostaAlternativa: ColetaAlternativa[];
    modal: string;

    // variaveis para salvar a pesquisa do usuário
    nomeBusca: string = null;
    nomeBuscaAnterior: string = null;
    busca = new BuscaSalva();
    buscaRetorno = new BuscaSalvaVM();
    mostraBuscaSalva: Boolean = false;
    eventbuscaRetorno = new EventEmitter<BuscaSalvaVM>();

    // variaveis para salvar as perguntas para montar a busca avançada
    QuestionarioParaSelecionar: Questionario[] = [];
    questionarioSelecionado: number = null;
    idQuestionarioSelecionado: number = null;
    perguntasBusca: SecaoPerguntas[] = [];
    perguntasParaSelecionar: Perguntas[] = [];
    perguntasParaSelecionar2: Perguntas[] = [];
    RetornoQuestionarioSelecionado: BuscaPesquisa[];
    novoBuscaAvancadaPergunta: boolean = false;
    buscaAvancadaPergunta: BuscaPesquisa[] = [];
    buscaAvancadaPerguntaFront: BuscaPesquisaFront[] = [];
    buscaPesquisaFront: BuscaPesquisaFront = new BuscaPesquisaFront();
    nomeBuscaPergunta: string = null;
    buscaPesquisaPerguntas = new BuscaPesquisaPerguntas();
    colecaoBuscaPesquisaPerguntas: BuscaPesquisaPerguntas[] = [];
    desabilitarQuestionario: boolean = false;
    nomeIndexBuscaPesquisa: number = null;
    isNew: boolean = null;
    idBuscaSalva: number = null;
    idColeta: number = null;
    idColetaAvaliação: number = null;
    coletaMultimidia: Multimidia[] = [];

    // variaveis novas para data
    public today: Date = new Date();
    public currentYear: number = this.today.getFullYear();
    public currentMonth: number = this.today.getMonth();
    public currentDay: number = this.today.getDate();
    datamenor: string = '';//Por hora ficará sem uma data limite
    dataInicial: Date = new Date(this.currentYear, this.currentMonth, this.currentDay - 1);
    dataLimite: Date = this.dataInicial;
    dataFinal: Date = new Date();
    dataMaxima: Date = new Date();
    horaInicial: Date = new Date('2018-11-08T00:00');
    horaMaxima: Date = new Date('2018-11-08T23:59');
    tempo: Date = new Date('2018-11-08T00:00');
    tempo2: Date = new Date('2018-11-08T23:59');

    // spinner dos carregamentos
    carregandoProjetos: boolean = false;
    carregandoQuestionario: boolean = false;
    carregandoEquipes: boolean = false;
    carregandoUsuarios: boolean = false;
    carregandoBuscaSalvas: boolean = false;
    carregandoExcel: boolean = false;
    carregandoToggle: boolean = false;
    excluindoBusca: boolean = false;
    salvarBusca: boolean = false;
    gerandoPDF: boolean = false;

    //variaveis para desabilitar botões
    pesquisado: boolean = false;
    buscando: boolean = false;

    projects: Projeto[];
    selectedProject = [];
    selectedEndereco: string[] = [];
    questionsEx: Questionario[];
    questions: Questionario[];
    selectedQuestions = [];
    equipe: Team[];
    selectedEquipe = [];
    usuario: User[];
    selectedUsuario = [];
    headerExcel: string[] = ['ID', 'data', 'Duração', 'Usuário', 'Equipe', 'Questionário', 'Projeto'];
    retornoHeaderExcel: string[] = [];

    filter: any = {
        equipes: <number[]>null,
        idCliente: <number>null,
        nome: <string>null,
        login: <string>null,
        email: <string>null,
        ativo: <boolean>null
    };

    filterBusca: any = {
        coletaID: <number>null,
        projetos: <number[]>null,
        equipes: <number[]>null,
        usuarios: <number[]>null,
        questionarios: <number[]>null,
        geoLocalizaoFiltro: <GeoLocalizaoFiltroInt>null,
        buscaPesquisaPerguntas: <BuscaPesquisaPerguntasSend[]>null,
        idCliente: <number>null,
        dataInicio: <Date>null,
        dataFim: <Date>null,
        duracaoInicio: <string>null,
        duracaoFim: <string>null,
        ativo: <boolean>null
    };

    markers: Marker[] = [];
    toggleMarkers: Marker[] = [];
    selectedMarkers = [];
    resposta: number = null;
    eventResposta = new EventEmitter<string>();
    @Input() idPergunta: number;
    user: Login;
    pageSize: number;
    new: boolean = true;
    descProjeto: string = null;

    // informações cabeçalho Respostas
    nomeUsuario: string = null;
    dataInicio: string = null;
    dataFim: string = null;
    duracao: string = null;

    public watermark: string = 'Selecione um período';
    public formatString: string = 'HH:mm';
    public interval: number = 60;

    constructor(private projetoService: ProjetoService,
        private spinner: NgxSpinnerService,
        private questionarioService: QuestionarioService,
        private equipeService: TeamService,
        private usuarioService: UserService,
        private mapsApiLoader: MapsAPILoader,
        private ngZone: NgZone,
        private coletaService: ColetaService,
        private translate: TranslateService,
        private auth: AuthService,
        private notification: NotificationService) {
        //Faz a tradução das palavras especificadas dentro do metodo stream    
        this.translate.stream('dateFormat').subscribe(dateformat => this.dateFormat = dateformat);
        this.translate.stream(this.headerExcel).subscribe(retorno => { this.retornoHeaderExcel = []; for(let x in retorno){ this.retornoHeaderExcel.push(retorno[x]);} });
        this.translate.stream('dateFormatInput').subscribe(dateFormatInput => this.dateFormatInput = dateFormatInput);
        this.translate.stream("Language").subscribe(x => { this.lang = x; });
        this.grid = new PagedListService({
            url: `${UserCustomer_Api}`,
            pageSize: 100000,
            sortField: 'Nome',
            sortType: 'asc',
            isAlive: this.isalive
        });
        this.gridSearchColeta = new PagedListService({
            url: `${GetAllColetas}`,
            pageSize: this.pageSize,
            sortField: 'DtInicio',
            sortType: 'desc',
            isAlive: this.isalive,
            isPost: true
        });

        this.toggleMarkers = [];
        this.coletas = null;
    }

    ngOnInit() {
        this.toggleMarkers = [];
        this.carregandoBuscaSalvas = true;
        this.carregandoProjetos = true;
        //Faz busca de todas as buscas salvas e dos projetos conforme o id do usuário
        forkJoin(
            this.coletaService.GetAllBuscaSalva(),
            this.projetoService.GetAllProjetos(),
        ).subscribe(
            ([resposta, projeto]) => {
                this.buscaRetorno = resposta;
                if (this.buscaRetorno.buscaSalva.length > 0) { this.mostraBuscaSalva = true };
                    this.projects = projeto;
                if ([resposta, projeto]) {
                    this.carregandoBuscaSalvas = false;
                    this.carregandoProjetos = false;
                }
            }
        );

        this.searchControl = new FormControl();
        this.setCurrentPosition();

        this.mapsApiLoader.load().then(() => {
            let autoComplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });

            autoComplete.addListener("place_changed", () => {
                // verifica se o endereço é novo ou não para não deixar colocar duas marcações no mapa
                if (this.new == false) {
                    this.markers.pop();
                };

                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autoComplete.getPlace();
                    this.place = place;
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 10;
                    this.radius = this.km * 1000;

                    this.putMarker(this.latitude, this.longitude);
                    this.selectedEndereco.push(place.formatted_address);
                });
            });
        });
        this.user = this.auth.getUser();
        this.pageSize = (this.auth.getPage()) ? this.auth.getPage() : 20;

        //usado para traduzir os componentes de data utilizados
        L10n.load({
            pt: {
                'datepicker': {
                    placeholder: 'Selecione uma Data',
                    today: 'Hoje'
                }
            },
            es: {
                'datepicker': {
                    placeholder: 'Seleccione una fecha',
                    today: 'Hoy'
                }
            },
            en: {
                'datepicker': {
                    placeholder: 'Select a date',
                    today: 'Today'
                }
            }
        });
    }

    //metodos necessários para utilizar o componente de Rate
    setRate(r: number) {
        this.rate = r;
        this.previousRate = undefined;
        this.rated = r;
    };

    setTemporaryRate(r: number) {
        if (this.previousRate === undefined) {
            this.previousRate = this.rate;
        };
        this.rate = r;
    };

    clearTemporaryRate() {
        if (this.previousRate !== undefined) {
            this.rate = this.previousRate;
            this.previousRate = undefined;
        };
    };
    //fim dos metodos do Rate

    setPage() {
        this.auth.storePageSize(this.pageSize);
    };

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 10;
            });
        };
    }

    CarregarQuestionarioEquipe() {
        if( this.selectedProject.length == 0 )
        {
            this.limparFiltros();
        }
        else 
        {
            this.carregandoQuestionario = true;
            this.carregandoEquipes = true;
            forkJoin(
                this.questionarioService.GetAllQuestionarioByIdProject(this.selectedProject),
                this.equipeService.getAllEquipesByProjeto(this.selectedProject)
            ).subscribe(
                ([questionarios, equipes]) => {
                    this.questions = questionarios;
                    this.equipe = equipes;
                    if ([questionarios, equipes]) 
                    {
                        this.carregandoQuestionario = false;
                        this.carregandoEquipes = false;
                    }
                }
            );
        }      
    };

    CarregarUsuarios() {
        this.carregandoUsuarios = true;
        this.usuarioService.getAllUsuariosByEquipe(this.selectedEquipe).subscribe(usuarios => {
            this.usuario = usuarios;
            if (usuarios) 
            { 
                this.carregandoUsuarios = false 
            }
        });
    };

    putMarker(lat: number, lng: number) {
        this.markers.push({
            lat: lat,
            lng: lng,
            radius: this.km * 1000,
            address: this.place.formatted_address,
            draggable: false
        });
        this.new = false;

        var posicao = new google.maps.LatLng(lat, lng);

        this.fitBounds.extend(posicao);
    };

    radiusChange() {
        this.markers[this.markers.length - 1].radius = this.km * 1000;
        if (this.markers.length) 
        {
            this.latitude = this.markers[this.markers.length - 1].lat;
            this.longitude = this.markers[this.markers.length - 1].lng;
            this.zoom = 10;
        } 
        else 
        {
            this.zoom = 10;
        }
    }

    salvarLocatizacao() {
        // pega o ultimo elemento para incluir nos selecionados
        this.new = true;
        let ultimoIndice = this.markers.pop();
        this.markers.push(ultimoIndice);
        this.selectedMarkers.push(ultimoIndice);
        this.searchControl = new FormControl();
        this.geocalizacao = new GeoLocalizaoFiltro();
        this.geocalizacao.latitude = this.latitude;
        this.geocalizacao.longitude = this.longitude;
        this.geocalizacao.raio = this.km;
        this.listGeocalizacao.push(this.geocalizacao);
        this.latitude = ultimoIndice.lat;
        this.longitude = ultimoIndice.lng;
    };

    tiraMarker(marker: Marker) {
        var index = this.selectedMarkers.findIndex(x => x == marker);
        this.selectedMarkers.splice(index, 1);
        this.markers.splice(index, 1);
        this.listGeocalizacao.splice(index, 1);
    };

    buscar() {
        this.pesquisado = false;
        
        if ( this.selectedProject.length < 1 ) 
        {
            this.notification.MostrarNotificacaoInfo("Selecione um Projeto", "Alerta");
        }
        else 
        {
            if ( this.dataInicial == null && !this.coletaID || this.dataFinal == null && !this.coletaID ) 
            {
                this.notification.MostrarNotificacaoInfo("without Date", "Alerta");
            } 
            else if ( this.tempo == null && !this.coletaID || this.tempo2 == null && !this.coletaID ) 
            {
                this.notification.MostrarNotificacaoInfo("without Time", "Alerta");
            } 
            else 
            {
                this.buscando = true;

                this.toggleMarkers = [];
                let tempoIni = this.tempo.toString().slice(16, 21);
                let tempoFim = this.tempo2.toString().slice(16, 21);
                let dataIni = new Date(this.dataInicial.toString());
                let dataFim = new Date(this.dataFinal.toString());
                this.gridSearchColeta.loading = true;

                this.filterBusca.coletaID = this.coletaID;
                this.filterBusca.Projetos = this.selectedProject;
                this.filterBusca.Equipes = this.selectedEquipe;
                this.filterBusca.Usuarios = this.selectedUsuario;
                this.filterBusca.Questionarios = this.selectedQuestions;
                this.filterBusca.geoLocalizaoFiltro = this.listGeocalizacao;
                this.filterBusca.buscaPesquisaPerguntas = this.colecaoBuscaPesquisaPerguntas;
                this.filterBusca.IDCliente = this.auth.getUser().idCliente;
                this.filterBusca.DataInicio = dataIni.toISOString();
                this.filterBusca.DataFim = dataFim.toISOString();
                this.filterBusca.duracaoInicio = tempoIni;
                this.filterBusca.duracaoFim = tempoFim;
                this.filterBusca.Ativo = this.Ativo;

                this.gridSearchColeta.pageSize = this.pageSize;
                this.gridSearchColeta.load(this.filterBusca, true);
                this.pesquisado = true;
                this.buscando = false;
            };
        };
    }

    // Faz a busca das informações para colocar no excel, porém faz a busca sem estar paginado
    buscarExcel() {
        this.buscando = true;
        if (this.selectedProject.length < 1) {
            this.notification.MostrarNotificacaoInfo("Selecione um Projeto", "Alerta");
            this.buscando = false;
        }
        else {
            if (this.dataInicial == null || this.dataFinal == null) {
                this.notification.MostrarNotificacaoInfo("without Date", "Alerta");
                this.buscando = false;
            } else if (this.tempo == null || this.tempo2 == null) {
                this.notification.MostrarNotificacaoInfo("without Time", "Alerta");
                this.buscando = false;
            } else {
                let tempoIni = this.tempo.toString().slice(16, 21);
                let tempoFim = this.tempo2.toString().slice(16, 21);
                let dataIni = new Date(this.dataInicial.toString());
                let dataFim = new Date(this.dataFinal.toString());
                this.carregandoExcel = true;

                this.buscaColeta.ColetaID = this.coletaID;
                this.buscaColeta.Projetos = this.selectedProject;
                this.buscaColeta.Equipes = this.selectedEquipe;
                this.buscaColeta.Usuarios = this.selectedUsuario;
                this.buscaColeta.Questionarios = this.selectedQuestions;
                this.buscaColeta.GeoLocalizaoFiltro = this.listGeocalizacao;
                this.buscaColeta.BuscaPesquisaPerguntas = this.colecaoBuscaPesquisaPerguntas;
                this.buscaColeta.IDCliente = this.auth.getUser().idCliente;
                this.buscaColeta.DataInicio = dataIni.toISOString();
                this.buscaColeta.DataFim = dataFim.toISOString();
                this.buscaColeta.DuracaoInicio = tempoIni;
                this.buscaColeta.DuracaoFim = tempoFim;
                this.buscaColeta.Ativo = this.Ativo;
                this.coletaService.GetAll(this.buscaColeta).subscribe(response => {
                    this.buscaColetaRetorno = response;
                    this.exportExcel(response);//metodo que add o conteudo dentro da planilha do excel
                    if (response) { this.carregandoExcel = false, this.buscando = false; }
                });
            };
        };
    };


    mostraMapa(latitude: number, longitude: number) {
        this.lat = latitude;
        this.lng = longitude;
        this.zoom = 14;
    };

    //seta as marcações dos toggles dentro do array para aparecer no mapa geral
    setarToggle(buscaColetaRetorno: BuscaColetaRetorno[]) {

        for (var x in buscaColetaRetorno) {
            var buscaColeta = buscaColetaRetorno[x];
            if (x == 'itens') {
                for (var itens in buscaColeta) {
                    var latitude = buscaColeta[itens].latitude;
                    var longitude = buscaColeta[itens].longitude;
                    if (latitude == undefined || latitude == null) { continue; }
                    this.toggleMarkers.push({
                        lat: latitude,
                        lng: longitude,
                        label: `${buscaColeta[itens].idColeta}`,
                        name: `${buscaColeta[itens].nomeUsuario}`,
                        Data: `${buscaColeta[itens].dtInicio}`,
                        draggable: false
                    });               
                }; 
            };
        };
        
        if (this.toggleMarkers[0] != undefined || this.toggleMarkers[0] != null) {
            this.lat = this.toggleMarkers[0].lat;
            this.lng = this.toggleMarkers[0].lng;
            this.zoom = 6;
        }
        this.carregandoToggle = false;
        $('#modalToggle').modal('show');
    };

    setarLocalizacaoToggle() {
        this.buscando = true;
        if (this.selectedProject.length < 1) {
            this.notification.MostrarNotificacaoInfo("Selecione um Projeto", "Alerta");
            this.buscando = false;
        }
        else {
            if (this.dataInicial == null || this.dataFinal == null) {
                this.notification.MostrarNotificacaoInfo("without Date", "Alerta");
                this.buscando = false;
            } else if (this.tempo == null || this.tempo2 == null) {
                this.notification.MostrarNotificacaoInfo("without Time", "Alerta");
                this.buscando = false;
            } else {
                this.carregandoToggle = true;
                let tempoIni = this.tempo.toString().slice(16, 21);
                let tempoFim = this.tempo2.toString().slice(16, 21);
                let dataIni = new Date(this.dataInicial.toString());
                let dataFim = new Date(this.dataFinal.toString());
                this.buscaColeta.ColetaID = this.coletaID;
                this.buscaColeta.Projetos = this.selectedProject;
                this.buscaColeta.Equipes = this.selectedEquipe;
                this.buscaColeta.Usuarios = this.selectedUsuario;
                this.buscaColeta.Questionarios = this.selectedQuestions;
                this.buscaColeta.GeoLocalizaoFiltro = this.listGeocalizacao;
                this.buscaColeta.BuscaPesquisaPerguntas = this.colecaoBuscaPesquisaPerguntas;
                this.buscaColeta.IDCliente = this.auth.getUser().idCliente;
                this.buscaColeta.DataInicio = dataIni.toISOString();
                this.buscaColeta.DataFim = dataFim.toISOString();
                this.buscaColeta.DuracaoInicio = tempoIni;
                this.buscaColeta.DuracaoFim = tempoFim;
                this.buscaColeta.Ativo = this.Ativo;

                this.coletaService.GetAll(this.buscaColeta).subscribe(response => {
                    this.buscaColetaRetorno = response;
                    if (response) {
                        this.setarToggle(response);
                        this.buscando = false;
                    }
                });
            };
        };
    };

    exportExcel(buscaColetaRetorno: any[]): void {
        for (var x in buscaColetaRetorno) {
            var dados = buscaColetaRetorno[x];
            if (x == 'itens') {
                var angular2Csv = new Angular2CsvComponent();
                angular2Csv.data = dados;
                angular2Csv.filename = `export_${Date.now()}`;
                angular2Csv.label_btn = 'Export to Excel';
                angular2Csv.options = {
                    decimalseparator: '.',
                    fieldSeparator: ';',
                    filename: `Export_${Date.now()}`,
                    headers: this.retornoHeaderExcel,
                    keys: ['idColeta', 'dtInicio', 'duracao', 'nomeUsuario', 'nomeEquipe', 'descQuestionario', 'descProjeto'],
                    quoteStrings: '"',
                    removeNewLines: true,
                    showLabels: false,
                    showTitle: false,
                    title: 'Teste de exportação',
                    useBom: true
                };
                angular2Csv.onDownload();
            };
        };
    };

    setarPerguntasColetas(nomeProjeto: string, idUsuario: number, idQuestionario:number, idColeta: number, nomeUsuario: string, dataInicio: Date, dataFim: any, duracao: any) {
        this.spinner.show();
        this.audioUrl = null;
        this.descProjeto = nomeProjeto;
        this.nomeUsuario = nomeUsuario;
        this.dataInicio = dataInicio.toString();
        this.dataFim = dataFim.toString();
        this.duracao = duracao.toString();

        forkJoin(
            this.questionarioService.GetAllColetaByQuestionario(idUsuario, idQuestionario),
            this.coletaService.GetAllRespostasColeta(idColeta)
        ).subscribe(([pergunta, respostas]) => {
            if (pergunta) 
            { 
                this.perguntas = pergunta[0].secaoPerguntas; 
            }
            this.coletas = respostas;
            this.respostaAlternativa = respostas.coletaAlternativa;
            for(var x in respostas.coletaMultimidia)
            {
                if( respostas.coletaMultimidia[x].tipoMidia == 3 && respostas.coletaMultimidia[x].ativo == true && respostas.coletaMultimidia[x].sync == true )
                {
                    this.audioUrl = respostas.coletaMultimidia[x].caminhoUrl;
                }
                else if ( respostas.coletaMultimidia[x].tipoMidia == 3 && respostas.coletaMultimidia[x].ativo == true && respostas.coletaMultimidia[x].sync == false )
                {
                    this.audioUrl = 'audio nao sincronizado'
                }
                else
                {
                    this.audioUrl = 'não tem audio';
                }
            }
            this.coletaMultimidia = respostas.coletaMultimidia;    
            $('#modalPerguntas').modal('show');
            this.spinner.hide();
        });
    };

    setarQuestionarios() {
        this.spinner.show();
        this.isNew = true;
        this.questionarioService.GetAllQuestionarioByIdCliente().subscribe(questionario => {
            this.QuestionarioParaSelecionar = questionario;
            this.nomeBuscaPergunta = null;
            this.resposta = null;
            this.idQuestionarioSelecionado = null;
            this.questionarioSelecionado = null;
            this.buscaAvancadaPergunta = [];
            this.buscaAvancadaPerguntaFront = [];
            this.desabilitarQuestionario = false;
            this.buscaPesquisaPerguntas = new BuscaPesquisaPerguntas();
            if (questionario) { this.spinner.hide() }
            $('#modalPerguntasBusca').modal('show');
        });
    };

    pegarPerguntas(perguntasBusca: SecaoPerguntas[]) {
        this.perguntasParaSelecionar = [];
        this.buscaAvancadaPerguntaFront = [];
        for (var x in perguntasBusca) {
            var dados = perguntasBusca[x].perguntas;
            for (var p in dados) {
                var dado = dados[p];
                if (dados[p].idTipoPergunta != 1) {
                    this.perguntasParaSelecionar.push(dado);
                    this.perguntasParaSelecionar2.push(dado);
                };
            };
        };
        if (this.buscaAvancadaPergunta != null) {
            for (var x in this.buscaAvancadaPergunta) {
                var idPergunta = this.buscaAvancadaPergunta[x].idPergunta;
                var retira = this.perguntasParaSelecionar.findIndex(x => x.id == idPergunta);
                this.perguntasParaSelecionar.splice(retira, 1);
            };
        };

        var tipoOperacao: string = null;

        for (var x in this.buscaAvancadaPergunta) {
            if (this.buscaAvancadaPergunta[x].tipoOperacao == 1) {
                tipoOperacao = 'Maior que';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == 2) {
                tipoOperacao = 'Menor que';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == 3) {
                tipoOperacao = 'Igual á';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == 4) {
                tipoOperacao = 'Entre';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == 5) {
                tipoOperacao = 'Contém';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == 6) {
                tipoOperacao = 'Não Contém';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == null && this.buscaAvancadaPergunta[x].idTipoPergunta == 2) {
                tipoOperacao = 'Livre';
            }
            if (this.buscaAvancadaPergunta[x].tipoOperacao == null && (this.buscaAvancadaPergunta[x].idTipoPergunta == 3 || this.buscaAvancadaPergunta[x].idTipoPergunta == 4)) {
                tipoOperacao = 'Selecionado';
            }
            this.buscaPesquisaFront.idTipoPergunta = this.buscaAvancadaPergunta[x].idTipoPergunta;
            this.buscaPesquisaFront.idPergunta = this.buscaAvancadaPergunta[x].idPergunta;
            var pergunta = this.perguntasParaSelecionar2.find(x => x.id == this.buscaPesquisaFront.idPergunta);
            this.buscaPesquisaFront.perguntaAlternativaDescricao = pergunta.descricao;
            this.buscaPesquisaFront.tipoOperacao = tipoOperacao;
            this.buscaPesquisaFront.descricaoResposta.push(this.buscaAvancadaPergunta[x].resposta);
            this.buscaPesquisaFront.resposta = this.buscaAvancadaPergunta[x].resposta;
            this.buscaPesquisaFront.respostaMaior = this.buscaAvancadaPergunta[x].respostaMaior;
            if (this.buscaAvancadaPergunta[x].selecionados.length > 0) {
                for (var num in this.buscaAvancadaPergunta[x].selecionados) {
                    var res = pergunta.perguntaAlternativas.find(t => t.id == this.buscaAvancadaPergunta[x].selecionados[num]);
                    this.buscaPesquisaFront.descricaoResposta.push(res.descricao);
                }
            };
            if (this.buscaAvancadaPergunta[x].selecionadosNao.length > 0) {
                for (var num in this.buscaAvancadaPergunta[x].selecionadosNao) {
                    var res = pergunta.perguntaAlternativas.find(t => t.id == this.buscaAvancadaPergunta[x].selecionadosNao[num]);
                    this.buscaPesquisaFront.descricaoRespostaNao.push(res.descricao);
                };
            };
            this.buscaAvancadaPerguntaFront.push(this.buscaPesquisaFront);
            this.buscaPesquisaFront = new BuscaPesquisaFront;
        };
    };

    receiverFeedback(respostaRetornoColecaoPerguntas) {
        this.RetornoQuestionarioSelecionado = respostaRetornoColecaoPerguntas;
    };

    receiverIdQuestionario(retornoIdQuestionarioSelecionado) {
        this.idQuestionarioSelecionado = retornoIdQuestionarioSelecionado;
    };

    salvarGrupoBuscaAvancadaPergunta() {
        if (this.isNew == true) {
            this.buscaPesquisaPerguntas.NomeBuscaPesquisa = this.nomeBuscaPergunta;
            this.buscaPesquisaPerguntas.idQuestionarioSelecionado = this.idQuestionarioSelecionado;
            this.buscaPesquisaPerguntas.BuscaPesquisa = this.RetornoQuestionarioSelecionado;
            this.colecaoBuscaPesquisaPerguntas.push(this.buscaPesquisaPerguntas);
        } else {
            this.colecaoBuscaPesquisaPerguntas[this.nomeIndexBuscaPesquisa].NomeBuscaPesquisa = this.nomeBuscaPergunta;
            this.colecaoBuscaPesquisaPerguntas[this.nomeIndexBuscaPesquisa].BuscaPesquisa = this.RetornoQuestionarioSelecionado;
            this.atualizarSalvarPesquisa();
        };
        this.resposta = null;
        this.QuestionarioParaSelecionar = [];
        this.perguntasParaSelecionar = [];
        this.buscaAvancadaPergunta = [];
        this.desabilitarQuestionario = false;
        this.nomeBuscaPergunta = null;
    };

    deletarFiltroPergunta(pesquisaPergunta: any) {
        var resp = this.colecaoBuscaPesquisaPerguntas.findIndex(x => x == pesquisaPergunta);
        this.colecaoBuscaPesquisaPerguntas.splice(resp, 1);
        this.notification.MostrarNotificacaoSucesso("Deletado com sucesso!", "Sucesso");
    };

    abrirModalBuscaPergunta(pesquisaPergunta: BuscaPesquisaPerguntas) {
        this.spinner.show();
        this.resposta = 0;
        if (this.idBuscaSalva) { this.isNew = false };
        this.nomeIndexBuscaPesquisa = this.colecaoBuscaPesquisaPerguntas.findIndex(x => x.BuscaPesquisa == pesquisaPergunta.BuscaPesquisa);
        this.nomeBuscaPergunta = pesquisaPergunta.NomeBuscaPesquisa;
        this.buscaAvancadaPergunta = pesquisaPergunta.BuscaPesquisa;
        this.questionarioService.GetAllQuestionarioByIdCliente()
                                .subscribe(questionario => { if (questionario) { this.abrirModalBuscaPerguntaQuestionario(questionario, pesquisaPergunta) } });
    };

    abrirModalBuscaPerguntaQuestionario(questionario: Questionario[], pesquisaPergunta: BuscaPesquisaPerguntas) {
        this.QuestionarioParaSelecionar = questionario;
        var quest = this.QuestionarioParaSelecionar.find(x => x.id == pesquisaPergunta.idQuestionarioSelecionado);
        var idQuest = this.QuestionarioParaSelecionar.findIndex(secaoPerguntas => secaoPerguntas.id == quest.id);
        this.questionarioService.GetAllColetaByUser(this.auth.getUser().idUsuario)
                                .subscribe(perguntas => {
                                            this.perguntasBusca = perguntas[idQuest].secaoPerguntas;
                                            this.QuestionarioParaSelecionar = questionario;
                                            this.questionarioSelecionado = questionario.find(x => x.id == pesquisaPergunta.idQuestionarioSelecionado).id;
                                            this.idQuestionarioSelecionado = pesquisaPergunta.idQuestionarioSelecionado;
                                            this.desabilitarQuestionario = true;
                                            this.resposta = 0;
                                            this.pegarPerguntas(this.perguntasBusca);
                                            $('#modalPerguntasBusca').modal('show');
                                            this.spinner.hide();
            });
    };

    salvarPesquisa() {
        let tempoIni = this.tempo.toString().slice(16, 21);
        let tempoFim = this.tempo2.toString().slice(16, 21);
        let dataIni = new Date(this.dataInicial.toString());
        let dataFim = new Date(this.dataFinal.toString());
        this.buscaColeta.Projetos = this.selectedProject;
        this.buscaColeta.Equipes = this.selectedEquipe;
        this.buscaColeta.Usuarios = this.selectedUsuario;
        this.buscaColeta.Questionarios = this.selectedQuestions;
        this.buscaColeta.GeoLocalizaoFiltro = this.listGeocalizacao;
        this.buscaColeta.BuscaPesquisaPerguntas = this.colecaoBuscaPesquisaPerguntas;
        this.buscaColeta.IDCliente = this.auth.getUser().idCliente;
        this.buscaColeta.DataInicio = dataIni.toISOString();
        this.buscaColeta.DataFim = dataFim.toISOString();
        this.buscaColeta.DuracaoInicio = tempoIni;
        this.buscaColeta.DuracaoFim = tempoFim;
        this.buscaColeta.Ativo = this.Ativo;
        this.buscaColeta.marker = this.markers;
        // gravação no objeto que sera enviado para a API
        this.busca.idUsuario = this.auth.getUser().idUsuario;
        this.busca.jsonBusca = JSON.stringify(this.buscaColeta);
        this.busca.nomeBusca = this.nomeBusca;
        this.busca.ativo = true;
        this.busca.id = 0;
        this.coletaService.SaveBuscaColeta(this.busca).subscribe(resposta => {
            if (resposta) {
                this.notification.MostrarNotificacaoSucesso("Salvo com Sucesso", "Sucesso");
                this.coletaService.GetAllBuscaSalva().subscribe(resposta => { this.buscaRetorno = resposta; this.mostraBuscaSalva = true });
            }
        });
    };

    atualizarSalvarPesquisa() {
        let tempoIni = this.tempo.toString().slice(16, 21);
        let tempoFim = this.tempo2.toString().slice(16, 21);
        let dataIni = new Date(this.dataInicial.toString());
        let dataFim = new Date(this.dataFinal.toString());
        this.buscaColeta.Projetos = this.selectedProject;
        this.buscaColeta.Equipes = this.selectedEquipe;
        this.buscaColeta.Usuarios = this.selectedUsuario;
        this.buscaColeta.Questionarios = this.selectedQuestions;
        this.buscaColeta.GeoLocalizaoFiltro = this.listGeocalizacao;
        this.buscaColeta.BuscaPesquisaPerguntas = this.colecaoBuscaPesquisaPerguntas;
        this.buscaColeta.IDCliente = this.auth.getUser().idCliente;
        this.buscaColeta.DataInicio = dataIni.toISOString();
        this.buscaColeta.DataFim = dataFim.toISOString();
        this.buscaColeta.DuracaoInicio = tempoIni;
        this.buscaColeta.DuracaoFim = tempoFim;
        this.buscaColeta.Ativo = this.Ativo;
        this.buscaColeta.marker = this.markers;
        // gravação no objeto que sera enviado para a API
        this.busca.idUsuario = this.auth.getUser().idUsuario;
        this.busca.jsonBusca = JSON.stringify(this.buscaColeta);
        this.busca.nomeBusca = this.nomeBusca;
        this.busca.id = this.idBuscaSalva;
        this.busca.ativo = true;
        this.coletaService.AtualizaBuscaSalva(this.busca)
            .subscribe(resposta => {
                if (resposta) {
                    this.notification.MostrarNotificacaoSucesso("Atualizado com Sucesso", "Sucesso");
                    this.coletaService.GetAllBuscaSalva()
                        .subscribe(resposta => {
                            this.buscaRetorno = resposta;
                            this.mostraBuscaSalva = true
                        });
                }
            });
    };

    deletarBuscaSalva(buscaSalva: BuscaSalva) {
        buscaSalva.ativo = false;
        this.coletaService.DeleteBuscaSalva(buscaSalva).subscribe(resposta => {
            if (resposta) { this.notification.MostrarNotificacaoSucesso("Filtro de Busca Deletado com sucesso!", "Sucesso") };
            this.coletaService.GetAllBuscaSalva().subscribe(resposta => {
                this.buscaRetorno = resposta;
                this.mostraBuscaSalva = false
            });
        });
    };

    setarBusca(buscaSalva: BuscaSalva) {
        var busca = JSON.parse(buscaSalva.jsonBusca);
        this.idBuscaSalva = buscaSalva.id;
        this.nomeBusca = buscaSalva.nomeBusca;
        this.nomeBuscaAnterior = buscaSalva.nomeBusca;
        this.selectedProject = busca.Projetos;
        this.selectedEquipe = busca.Equipes;
        this.CarregarUsuarios();
        this.CarregarQuestionarioEquipe();
        this.selectedUsuario = busca.Usuarios;
        this.selectedQuestions = busca.Questionarios;
        this.listGeocalizacao = busca.GeoLocalizaoFiltro;
        this.selectedMarkers = busca.marker;
        this.colecaoBuscaPesquisaPerguntas = busca.BuscaPesquisaPerguntas;
        this.markers = busca.marker;
        var ano = busca.DataInicio.slice(0, 4);
        var mes = busca.DataInicio.slice(5, 7);
        var dia = busca.DataInicio.slice(8, 10);
        this.dataInicial = new Date(+ano, +mes - 1, +dia);
        var anoF = busca.DataFim.slice(0, 4);
        var mesF = busca.DataFim.slice(5, 7);
        var diaF = busca.DataFim.slice(8, 10);
        this.dataFinal = new Date(+anoF, +mesF - 1, +diaF);
        this.tempo = busca.DuracaoInicio;
        this.tempo2 = busca.DuracaoFim;
        this.Ativo = this.busca.ativo;
        buscaSalva = null;
    };

    limparFiltros() {
        this.selectedProject = [];
        this.selectedQuestions = [];
        this.selectedEquipe = [];
        this.selectedUsuario = [];
        this.dataInicial = new Date(this.currentYear, this.currentMonth, this.currentDay - 1);
        this.dataFinal = new Date();
        this.tempo = new Date('2018-11-08T00:00');
        this.tempo2 = new Date('2018-11-08T23:59');
        this.Ativo = null;
        this.selectedMarkers = [];
        this.colecaoBuscaPesquisaPerguntas = [];
        this.idBuscaSalva = null;
    };

    avaliar(idColeta: number) {
        this.idColetaAvaliação = idColeta;
        this.idColeta = idColeta;
        this.coletaAvaliacao = new ColetaAvaliacao();
        this.rate = null;
        this.rated = null;
        this.textArea = null;
    };

    EditarAvaliacao(idColeta: number) {
        this.idColetaAvaliação = idColeta;
        this.coletaService.PegarAvaliacao(idColeta).subscribe(avaliacao => {
            this.setarValores(avaliacao);
            this.coletaAvaliacao = avaliacao;
            if (avaliacao) {
                $('#modalEditarAvaliar').modal('show');
            }
        });
    };

    setarValores(avaliacao: ColetaAvaliacao) {
        this.rated = avaliacao.nota;
        this.rate = avaliacao.nota;
        this.textArea = avaliacao.observacao;
    };

    salvarAvaliacao() {
        this.spinner.show();
        this.coletaAvaliacao.id = 0;
        this.coletaAvaliacao.idColeta = this.idColeta;
        this.coletaAvaliacao.idUsuario = this.auth.getUser().idUsuario;
        this.coletaAvaliacao.nota = this.rated;
        this.coletaAvaliacao.observacao = this.textArea;
        this.coletaService.AvaliarColeta(this.coletaAvaliacao).subscribe(avaliacao => {
            if (avaliacao == true) {
                this.coletaAvaliacao = new ColetaAvaliacao();
                this.setarAvaliacao();
                this.notification.MostrarNotificacaoSucesso("Avaliação feita com sucesso!", "Sucesso");
                this.spinner.hide();
            } else {
                this.spinner.hide();
                this.notification.MostrarNotificacaoErro("Não foi possível avaliar", "Erro")
            }
        });
    };

    setarAvaliacao() {
        for (var x in this.gridSearchColeta.itens) {
            var item = this.gridSearchColeta.itens[x];
            if (item.idColeta == this.idColetaAvaliação) {
                item.nota = this.rated;
            };
        };
    };

    salvarAvaliacaoAtualizada() {
        this.spinner.show();
        this.coletaAvaliacao.nota = this.rated;
        this.coletaAvaliacao.observacao = this.textArea;
        this.coletaService.AvaliarColeta(this.coletaAvaliacao).subscribe(avaliacao => {
            if (avaliacao == true) {
                this.coletaAvaliacao = new ColetaAvaliacao();
                this.setarAvaliacao();
                this.notification.MostrarNotificacaoSucesso("Avaliação feita com sucesso!", "Sucesso");
                this.spinner.hide();
            } else {
                this.spinner.hide();
                this.notification.MostrarNotificacaoErro("Não foi possível avaliar", "Erro")
            }
        });
    };

    imprimindo(){
        this.gerandoPDF = true;

        this.coletaService.GetPdf(this.coletas.idColeta).subscribe(pdf => { window.location.href = pdf;
                                                                            this.gerandoPDF = false; })    
    }

    ngOnDestroy() 
    {
        this.isalive = false;
        this.toggleMarkers = null;
    }
}