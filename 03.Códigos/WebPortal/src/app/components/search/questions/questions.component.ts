import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BuscaPesquisa, BuscaPesquisaPerguntas, BuscaPesquisaFront } from '../../../models/buscaPesquisaPerguntas.model';
import { Perguntas, SecaoPerguntas } from '../../../models/secaoPerguntas.model';
import { Questionario } from '../../../models/questionario.model';
import { QuestionarioService } from '../../../services/questionario.service';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

declare const $: any;

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})

export class QuestionsComponent implements OnInit {
  @Input() isNew: boolean = true;
  @Input() desabilitarQuestionario: boolean;
  @Input() QuestionarioParaSelecionar: Questionario[] = [];
  @Input() idQuestionarioSelecionado: number;
  @Input() perguntasParaSelecionar: Perguntas[] = [];
  @Input() perguntasParaSelecionar2: Perguntas[] = [];
  @Input() buscaAvancadaPergunta: BuscaPesquisa[] = [];
  @Input() questionarioSelecionado: number = null;
  @Input() nomeBuscaPergunta: string = null;
  @Input() resposta: number = null;
  @Output() retorno = new EventEmitter<BuscaPesquisa[]>();
  @Output() retornoIdQuestionarioSelecionado = new EventEmitter<number>();
  @Input() buscaAvancadaPerguntaFront: BuscaPesquisaFront[] = [];

  questionarioSelecionado2: number = null;
  perguntasBusca: SecaoPerguntas[] = [];
  respostaPergunta: Perguntas = null;
  idPerguntaAlternativa: number = null;
  idTipoPergunta: number = null;
  repostaTipo2: string = null;
  respostaNumero: number = null;
  respostaMenor: string = null;
  respostaMaior: string = null;
  respostaData: Date = null;
  selecionadoSim: number[] = [];
  selecionadoNao: number[] = [];
  operador: number = null;
  buscaPesquisa = new BuscaPesquisa();
  buscaPesquisaFront = new BuscaPesquisaFront();
  buscaPesquisaPerguntas = new BuscaPesquisaPerguntas();
  colecaoBuscaPesquisaPerguntas: BuscaPesquisaPerguntas[] = [];
  respostaPerguntaAlternativa: number[] = [];
  respostaPerguntaAlternativaDescricao: string[] = [];
  liberarAdd: boolean = false;
  loading: boolean = false;
  // variaveis usadas para os campos de data
  dataInicial: string = '2017-01-07'
  dataFinal: string = new Date().toISOString().slice(0,10)
  dataMinima: string = '2017-01-07'
  dataMaxima: string = new Date().toISOString().slice(0,10)

  constructor(private questionarioService: QuestionarioService, private auth: AuthService, private notification: NotificationService) { }

  ngOnInit() {}

  setarPerguntas(quest: number) {
    this.loading = true;
    this.idQuestionarioSelecionado = quest;
    this.desabilitarQuestionario = true;
    var idQuest = this.QuestionarioParaSelecionar.findIndex(secaoPerguntas => secaoPerguntas.id == quest);
    this.questionarioService.GetAllColetaByUser(this.auth.getUser().idUsuario).subscribe(perguntas => { this.perguntasBusca = perguntas[idQuest].secaoPerguntas;
                                                                                                        this.pegarPerguntas(this.perguntasBusca); })
    this.retornoIdQuestionarioSelecionado.emit(quest);
  }

  pegarPerguntas(perguntasBusca: SecaoPerguntas[]) {
    this.perguntasParaSelecionar = [];
    for (var x in perguntasBusca) {
      var dados = perguntasBusca[x].perguntas;
      for (var p in dados) {
        var dado = dados[p];
        if(dados[p].idTipoPergunta != 1){
          this.perguntasParaSelecionar.push(dado);
          this.perguntasParaSelecionar2.push(dado);
        }   
      }
    }
    this.loading = false;
  }

  perguntasSelecionada(idPerguntas: number) {
    this.respostaPergunta = this.perguntasParaSelecionar.find(perguntas => perguntas.id == idPerguntas);
    this.idTipoPergunta = this.respostaPergunta.idTipoPergunta;
    this.idPerguntaAlternativa = this.respostaPergunta.id;
    this.liberarAdd = true;
  }

  perguntaAlternativaSelecionada(respostaAlternativa: any) {
    var retrespostaAlternativa = this.respostaPergunta.perguntaAlternativas.find(perguntasAlternativas => perguntasAlternativas.id == respostaAlternativa);
    this.selecionadoSim.push(retrespostaAlternativa.id);
    this.respostaMenor = retrespostaAlternativa.descricao;
  }

  salvarBuscaAvancadaPergunta() {
    if (this.isNew == true) { this.buscaPesquisa = new BuscaPesquisa(); this.buscaPesquisaFront = new BuscaPesquisaFront() }
    var perguntaAleternativaDescricao = this.respostaPergunta.descricao;
    var tipoOperacao: string;

    if (this.operador == 1) { tipoOperacao = 'Maior que'; }
    if (this.operador == 2) { tipoOperacao = 'Menor que'; }
    if (this.operador == 3) { tipoOperacao = 'Igual á'; }
    if (this.operador == 4) { tipoOperacao = 'Entre' }
    if (this.operador == 5) { tipoOperacao = 'Contém' }
    if (this.operador == 6) { tipoOperacao = 'Não Contém' }

    if (this.idTipoPergunta == 1 || this.idTipoPergunta == 7) {
      if(!this.respostaPerguntaAlternativa.length){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      for (var x in this.respostaPerguntaAlternativa) {
        var id = this.respostaPerguntaAlternativa[x];
        var respPerguntaAlternativa = this.respostaPergunta.perguntaAlternativas.find(x => x.id == id);
        this.buscaPesquisaFront.descricaoResposta.push(respPerguntaAlternativa.descricao);
      }
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = 'Selecionado';
      this.buscaPesquisaFront.selecionadoSim = this.selecionadoSim;
      this.buscaPesquisaFront.selecionadoNao = this.selecionadoNao;
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.buscaPesquisaFront.resposta;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.respostaPerguntaAlternativa;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    if (this.idTipoPergunta == 2) {
      if(!this.repostaTipo2){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      this.buscaPesquisaFront.descricaoResposta = [];
      this.buscaPesquisaFront.descricaoResposta.push(this.repostaTipo2);
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = 'Livre';
      this.buscaPesquisaFront.selecionadoSim = this.selecionadoSim;
      this.buscaPesquisaFront.selecionadoNao = this.selecionadoNao;
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.repostaTipo2;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.buscaPesquisaFront.selecionadoSim;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    if (this.idTipoPergunta == 3) {
      if(!this.respostaPerguntaAlternativa.length){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      for (var x in this.respostaPerguntaAlternativa) {
        var id = this.respostaPerguntaAlternativa[x];
        var respPerguntaAlternativa = this.respostaPergunta.perguntaAlternativas.find(x => x.id == id);
        this.buscaPesquisaFront.descricaoResposta.push(respPerguntaAlternativa.descricao);
      }
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = 'Selecionado';
      this.buscaPesquisaFront.selecionadoSim = this.respostaPerguntaAlternativa;
      this.buscaPesquisaFront.selecionadoNao = this.selecionadoNao;
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.buscaPesquisaFront.resposta;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.respostaPerguntaAlternativa;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    if (this.idTipoPergunta == 4) {
      if(!this.selecionadoSim.length || !this.selecionadoNao.length){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      for (var x in this.selecionadoSim) {
        var id = this.selecionadoSim[x];
        var respPerguntaAlternativa = this.respostaPergunta.perguntaAlternativas.find(x => x.id == id);
        this.buscaPesquisaFront.descricaoResposta.push(respPerguntaAlternativa.descricao);
      }
      for (var x in this.selecionadoNao) {
        var id = this.selecionadoNao[x];
        var respPerguntaAlternativa = this.respostaPergunta.perguntaAlternativas.find(x => x.id == id);
        this.buscaPesquisaFront.descricaoRespostaNao.push(respPerguntaAlternativa.descricao);
      }
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = 'Selecionado';
      this.buscaPesquisaFront.selecionadoSim = this.selecionadoSim;
      this.buscaPesquisaFront.selecionadoNao = this.selecionadoNao;
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.buscaPesquisaFront.resposta;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.buscaPesquisaFront.selecionadoSim;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    if (this.idTipoPergunta == 8) {
      this.buscaPesquisaFront.descricaoResposta = [];
      if(!this.respostaPerguntaAlternativa.length){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      for (var x in this.respostaPerguntaAlternativa) {
        var id = this.respostaPerguntaAlternativa[x];
        var respPerguntaAlternativa = this.respostaPergunta.perguntaAlternativas.find(x => x.id == id);
        this.buscaPesquisaFront.descricaoResposta.push(respPerguntaAlternativa.descricao);
      }
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = tipoOperacao;
      this.buscaPesquisaFront.selecionadoSim = this.selecionadoSim;
      this.buscaPesquisaFront.selecionadoNao = this.selecionadoNao;
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.buscaPesquisaFront.resposta;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.respostaPerguntaAlternativa;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    if (this.idTipoPergunta == 9) {
      this.buscaPesquisaFront.descricaoResposta = [];
      if(!this.respostaPerguntaAlternativa.length){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      for (var x in this.respostaPerguntaAlternativa) {
        var id = this.respostaPerguntaAlternativa[x];
        var respPerguntaAlternativa = this.respostaPergunta.perguntaAlternativas.find(x => x.id == id);
        this.buscaPesquisaFront.descricaoResposta.push(respPerguntaAlternativa.descricao);
      }      
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = tipoOperacao;
      this.buscaPesquisaFront.selecionadoSim = this.selecionadoSim;
      this.buscaPesquisaFront.selecionadoNao = this.selecionadoNao;
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.buscaPesquisaFront.resposta;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.respostaPerguntaAlternativa;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    if (this.idTipoPergunta == 5 || this.idTipoPergunta == 6 || this.idTipoPergunta == 10) {
      if(!this.operador){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      if(this.operador == 4 && (this.idTipoPergunta == 6 || this.idTipoPergunta == 10) && (!this.respostaMenor || !this.respostaMaior)){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      else if((this.idTipoPergunta == 6 || this.idTipoPergunta == 10) && !this.respostaMenor){
        this.notification.MostrarNotificacaoInfo('Por Favor, preencher todos os dados','Alerta'); return;
      }
      if(!this.respostaMenor && this.idTipoPergunta == 5){ this.respostaMenor = this.dataInicial}
      if(!this.respostaMaior && this.idTipoPergunta == 5 && this.operador == 4){ this.respostaMaior = this.dataFinal; }
      this.buscaPesquisaFront.descricaoResposta = []
      this.buscaPesquisaFront.idPergunta = this.idPerguntaAlternativa;
      this.buscaPesquisaFront.perguntaAlternativaDescricao = perguntaAleternativaDescricao;
      this.buscaPesquisaFront.tipoOperacao = tipoOperacao;
      this.buscaPesquisaFront.resposta = this.respostaMenor;
      this.buscaPesquisaFront.respostaMaior = this.respostaMaior;
      if(this.operador == 4){ this.buscaPesquisaFront.descricaoResposta.push(this.respostaMenor, this.respostaMaior); }
      else{ this.buscaPesquisaFront.descricaoResposta.push(this.respostaMenor); }
      this.buscaPesquisaFront.idTipoPergunta = this.idTipoPergunta;
      // Dados para enviar para a API
      this.buscaPesquisa.idPergunta = this.buscaPesquisaFront.idPergunta;
      this.buscaPesquisa.idTipoPergunta = this.buscaPesquisaFront.idTipoPergunta;
      this.buscaPesquisa.tipoOperacao = this.operador;
      this.buscaPesquisa.resposta = this.buscaPesquisaFront.resposta;
      this.buscaPesquisa.respostaMaior = this.buscaPesquisaFront.respostaMaior;
      this.buscaPesquisa.selecionados = this.buscaPesquisaFront.selecionadoSim;
      this.buscaPesquisa.selecionadosNao = this.buscaPesquisaFront.selecionadoNao;
    }
    this.buscaAvancadaPerguntaFront.push(this.buscaPesquisaFront);
    this.buscaAvancadaPergunta.push(this.buscaPesquisa);
    var retirar = this.perguntasParaSelecionar.findIndex(x => x == this.respostaPergunta);
    this.perguntasParaSelecionar.splice(retirar, 1);
    this.retorno.emit(this.buscaAvancadaPergunta);

    this.idPerguntaAlternativa = null;
    this.idTipoPergunta = null;
    this.repostaTipo2 = null;
    this.operador = null;
    tipoOperacao = null;
    this.resposta = null;
    this.selecionadoSim = [];
    this.selecionadoNao = [];
    this.resposta = null;
    this.respostaMenor = null;
    this.respostaMaior = null;
    this.respostaPerguntaAlternativa = [];
    this.liberarAdd = false;
    this.respostaPerguntaAlternativaDescricao = [];
    this.dataFinal = null;
    this.dataInicial =null;
    if(this.isNew == false){ this.buscaPesquisaFront = new BuscaPesquisaFront(); 
                             this.buscaPesquisa = new BuscaPesquisa(); } 
  }

  deletarBuscaPerguntaSalva(buscaPerguntaSalva: BuscaPesquisa) {
    var perguntarRetornar = this.perguntasParaSelecionar2.find(x => x.id == buscaPerguntaSalva.idPergunta);
    this.perguntasParaSelecionar.push(perguntarRetornar);

    this.perguntasParaSelecionar.sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    })

    var resp = this.buscaAvancadaPergunta.findIndex(x => x.idPergunta == buscaPerguntaSalva.idPergunta);
    var respFront = this.buscaAvancadaPerguntaFront.findIndex(y => y.idPergunta == buscaPerguntaSalva.idPergunta);
    this.buscaAvancadaPergunta.splice(resp, 1);
    this.buscaAvancadaPerguntaFront.splice(respFront, 1);
    this.notification.MostrarNotificacaoSucesso("Deletado com sucesso!", "Sucesso");
  }

  setCheckSim(id: number) {
    this.selecionadoSim.push(id);
  }

  setCheckNao(id: number) {
    this.selecionadoNao.push(id);
  }

  salvar() {
    if (this.isNew == true) {
      this.idQuestionarioSelecionado = null;
      this.desabilitarQuestionario = false;
      this.questionarioSelecionado = null;
    } else {
      this.desabilitarQuestionario = true;
    }
    this.resposta = 0;
    this.resposta = null;
    this.buscaAvancadaPergunta = [];
  }

  cancelarBusca() {
    if (this.isNew) {
      this.desabilitarQuestionario = false;
      this.idQuestionarioSelecionado = null;
      this.QuestionarioParaSelecionar = [];
      this.questionarioSelecionado = null;      
      this.perguntasParaSelecionar = [];
      this.operador = null;
      this.resposta = null;
      this.idPerguntaAlternativa = null;
      this.idTipoPergunta = null;
      this.buscaAvancadaPergunta = [];
         
      $('#modalPerguntasBusca').modal('hide');
    }
    else{
      this.resposta = null;
      this.idPerguntaAlternativa = null;
      this.idTipoPergunta = null;
      this.perguntasParaSelecionar = [];

      $('#modalPerguntasBusca').modal('hide');
    }
  }
}
