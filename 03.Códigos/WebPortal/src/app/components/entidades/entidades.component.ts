import { Component, OnInit } from '@angular/core';
import { TipoEntidade, TipoEntidadeCampo } from 'src/app/models/TipoEntidade.model';
import { EntidadeService } from 'src/app/services/Entidade.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Entidade, EntidadeCampo } from 'src/app/models/Entidade.model';
import { SearchEntidadeAdvanced } from 'src/app/models/searchEntidadeAdvanced.model';
import { PagedListService } from 'ng-paged-list/paged-list.service';
import { GetAllEntidades } from 'src/app/app.api';
import { forkJoin } from 'rxjs';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { enableRipple } from '@syncfusion/ej2-base';
import { TranslateService } from '@ngx-translate/core';


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
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  // Variaveis para TipoEntidade
  tipoEntidade: TipoEntidade = new TipoEntidade(null, null, null, '', [],[], true, null, null);
  idTipoEntidade: number = null;
  descricaoEntidade: string = null;
  nomeTipoEntidadeExcluir: string = null;
  modificarTipoEntidade: TipoEntidade = new TipoEntidade(null, null, null, '',[], [], true, null, null);
  carregandoTipoEntidades: boolean = false;
  TiposEntidades: TipoEntidade[] = [];
  siglaTipoEntidadeCampo: string = null;
  nomeTipoEntidadeCampo: string = null;
  tiposTipoEntidadeCampo: number = null;
  tipoEntidadeCampo: TipoEntidadeCampo;
  tiposEntidadeCampos: TipoEntidadeCampo[] = [];
  obrigatorio: boolean = false;
  EntidadeCampos: TipoEntidadeCampo[] = [];
  TipoEntidadeModificar: TipoEntidade = new TipoEntidade(null, null, null, '',[], [], true, null, null);
  EntidadeModificar: EntidadeCampo[] = [];
  quantidadeArray: number = 0;
  dataMaxima: Date = new Date();

  AdicionarEntidadeCampos: EntidadeCampo[] = [];
  valor: EntidadeCampo;

  //variavies para Entidade
  TipoEntidadeID: number = null;
  EntidadePaiID: number = null;
  entidadeEditar: Entidade = new Entidade(null, null, null, '', '', true, [], null, null)
  entidadeExcluir: Entidade = new Entidade(null, null, null, '', '', true,[], null, null)
  carregandoEntidade: boolean = false;
  carregandoEntidadePai: boolean = false;
  entidadesPai: Entidade[] = [];
  nomeEntidadeExcluir: string = null;
  entidades: Entidade[] = [];
  InputCodExterno: string = null;
  InputDescricao: string = null;
  lang: string;
  entidadeSalvar: Entidade =  new Entidade(null, null, null, '', '', true, [], null, null);
  entidadeCampo: EntidadeCampo;
  entidadeCamposSalvar: EntidadeCampo[] = [];
  

  // variaveis da busca de entidade
  tipoEntidadeId = [];
  codExterno: string = null;
  buscaDescricao: string = null;
  ativo: string = null;
  pageIndex: number = 1;
  nomeCliente: string = null;
  Entidades = new SearchEntidadeAdvanced();
  modificarCod: string = null;
  modificarIdTipo: number = null;

  grid: PagedListService;
  pageSize: number;

  entidade: any = {
    IDTipoEntidade: <number[]>null,
    IDUsuario: <number>null,
    CodigoExterno: <number>null,
    Descricao: <string>null,
    Ativo: <boolean>true
  };

  constructor(private entidadeService: EntidadeService,
    private auth: AuthService,
    private translate: TranslateService,
    private notification: NotificationService) {
    this.translate.stream("Language").subscribe(x => { this.lang = x; });
    this.grid = new PagedListService({
      url: `${GetAllEntidades}`,
      pageSize: this.pageSize,
      sortField: 'IDEntidade',
      sortType: 'asc',
      isAlive: true,
      isPost: true
    });

  }

  ngOnInit() {
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

    this.carregandoTipoEntidades = true;

    this.entidadeService.GetAllTipoEntidade(this.auth.getUser().idUsuario).subscribe(tiposEntidades => {  this.TiposEntidades = tiposEntidades;
                                                                                                          this.carregandoTipoEntidades = false;
                                                                                                        });

    this.pageSize = (this.auth.getPage()) ? this.auth.getPage() : 20;
  }

  salvarEntidade() {
    if (!this.InputCodExterno) {
      this.notification.MostrarNotificacaoInfo("Por favor, defina um código válido", "Alerta");
      return;
    }
    else {
      this.entidadeSalvar.CodExterno = this.InputCodExterno;
    }

    if (this.entidadesPai.length && !this.EntidadePaiID) {
      this.notification.MostrarNotificacaoInfo("Por favor, selecione uma entidade pai", "Alerta");
      return;
    }
    else {
      this.entidadeSalvar.IDEntidadePai = this.EntidadePaiID;
    }

    if (!this.InputDescricao) {
      this.notification.MostrarNotificacaoInfo("Por favor, preencha a descrição", "Alerta");
      return;
    } else {
      this.entidadeSalvar.Descricao = this.InputDescricao;
    }

    this.entidadeSalvar.id = 0;
    this.entidadeSalvar.IDTipoEntidade = this.TipoEntidadeID;
    this.entidadeSalvar.entidadeCampos = this.entidadeCamposSalvar;

    this.entidadeService.SaveUpdateEntidade(this.entidadeSalvar).subscribe(resp => {
      if (resp == 'cadastrado com sucesso') {
        this.notification.MostrarNotificacaoSucesso("Entidade salvo com sucesso", "Sucesso");
        this.limparEntidade();
        if (this.grid.totalRows > 0) {
          this.buscar();
        }
        $('#modalNewEntidade').modal('hide');
      }else if (resp == 'Desculpe, já possui esse código atrelado a esse tipo de entidade'){
        this.notification.MostrarNotificacaoErro("Desculpe, já possui esse código atrelado a esse tipo de entidade", "Alerta");
      }
    });   
  }

  salvarTipoEntidade() {
    this.tipoEntidade.idTipoEntidade = 0;
    this.tipoEntidade.idTipoEntidadePai = this.idTipoEntidade;


    if (this.descricaoEntidade) {
      this.tipoEntidade.descricao = this.descricaoEntidade;
    } else {
      this.notification.MostrarNotificacaoInfo("Por favor, informe uma descrição", "Erro");
      return;
    }

    this.tipoEntidade.idCliente = this.auth.getUser().idCliente;
    this.tipoEntidade.tipoEntidadeCampos = this.tiposEntidadeCampos;

    this.entidadeService.SaveUpdateTipoEntidade(this.tipoEntidade).subscribe(resp => {
      if (resp) {
        this.ngOnInit();
        this.notification.MostrarNotificacaoSucesso("Tipo Entidade salvo com sucesso", "Sucesso");
        this.limparTipoEntidade();
      }
    });
    $('#modalNewTipoEntidade').modal('hide');
  }

  editarTipoEntidade() {
    this.entidadeService.SaveUpdateTipoEntidade(this.modificarTipoEntidade).subscribe(resp => {
      if (resp) {
        this.notification.MostrarNotificacaoSucesso("Tipo Entidade modificado com sucesso", "Sucesso");
        this.limparTipoEntidade();
      }
    });

    $('#modalModificarTipoEntidade').modal('hide');
  }

  excluirTipoEntidade() {
    this.modificarTipoEntidade.ativo = false;

    this.entidadeService.SaveUpdateTipoEntidade(this.modificarTipoEntidade).subscribe(resp => {
      if (resp) {
        this.ngOnInit();
        this.notification.MostrarNotificacaoSucesso("Tipo Entidade excluído com sucesso", "Sucesso");
        this.limparTipoEntidade();
        $('#modalExcluirTipoEntidade').modal('hide');
      }
    });
  }

  setarTipoEntidadeExcluir(tipoEntidade: any) {
    $('#modalNewTipoEntidade').modal('hide');//fecha o modal onde aparece os tipos Entidades

    this.nomeTipoEntidadeExcluir = `${tipoEntidade.id} - ${tipoEntidade.descricao}`;
    this.modificarTipoEntidade = tipoEntidade;
        
    $('#modalExcluirTipoEntidade').modal('show');
  }

  setarTipoEntidade(tipoEntidade: TipoEntidade) {
    $('#modalNewTipoEntidade').modal('hide');//fecha o modal onde aparece os tipos Entidades
    
    this.modificarTipoEntidade = null;
    this.modificarTipoEntidade = tipoEntidade;

    $('#modalModificarTipoEntidade').modal('show');
  }

  BuscarEntidadePai() {
    this.carregandoEntidadePai = true;
    this.entidadesPai = [];

    forkJoin(
      this.entidadeService.GetAllEntidadesPai(this.TipoEntidadeID),
      this.entidadeService.GetTipoEntidadeById(this.TipoEntidadeID),
    ).subscribe(
      ([entidadesPai, tipoEntidade]) => {
        this.entidadesPai = entidadesPai;
        this.EntidadeCampos = tipoEntidade.tipoEntidadeCampos;
        for(var x in this.EntidadeCampos)
        {
          this.valor = new EntidadeCampo(null, null, null)
          this.valor.idTipoEntidadeCampo = this.EntidadeCampos[x].id;
          this.AdicionarEntidadeCampos.push(this.valor)
        }
        if([entidadesPai, tipoEntidade])
        { 
          this.carregandoEntidadePai = false; 
        }
      }
    )
  }

  buscar() {
    this.entidade.idTipoEntidade = this.tipoEntidadeId;
    this.entidade.IDUsuario = this.auth.getUser().idUsuario;
    this.entidade.CodigoExterno = this.codExterno;
    this.entidade.Descricao = this.buscaDescricao;
    this.entidade.ativo = this.ativo;

    this.grid.pageSize = this.pageSize;
    this.grid.load(this.entidade);
  }

  SetarEditarEntidade(entidade: any) {
    this.EntidadeModificar = [];
    this.modificarIdTipo = entidade.idTipoEntidade;
    this.modificarCod = entidade.codExterno;

    this.entidadeEditar.id = entidade.idEntidade;
    this.entidadeEditar.IDEntidadePai = entidade.idEntidadePai;
    this.entidadeEditar.IDTipoEntidade = entidade.idTipoEntidade;
    this.entidadeEditar.CodExterno = entidade.codExterno;
    this.entidadeEditar.Descricao = entidade.descricao;
    this.entidadeEditar.DtInclusao = entidade.dtInclusao;
    this.entidadeEditar.DtAlteracao = entidade.dtAlteracao;
    this.entidadeEditar.Ativo = entidade.ativo;

    this.entidadeService.GetTipoEntidadeById(entidade.idTipoEntidade).subscribe(tipoEntidade => { this.TipoEntidadeModificar = tipoEntidade; 
                                                                                                  this.EntidadeModificar = this.setarRespostas(tipoEntidade.entidades, entidade.idEntidade, tipoEntidade.tipoEntidadeCampos)
                                                                                                  if(tipoEntidade){
                                                                                                    $('#modalModificarEntidade').modal('show');
                                                                                                }                                                                                               
                                                                                                });

    
  }

  setarRespostas(entidades: Entidade[], idEntidade: number, tipoEntidadeCampos: TipoEntidadeCampo[]): EntidadeCampo[]{
    var entidadeCampos: EntidadeCampo[] = [];

      for(var x in entidades)
      {
        if(entidades[x].id == idEntidade)
        {
          for(var t in tipoEntidadeCampos)
          {       
            // verifica se o entidadeCampos esta vazio
            if(entidades[x].entidadeCampos.length == 0)
            {
              var novaEntidade = new EntidadeCampo(null, null, null);
              if(tipoEntidadeCampos[t].tipo == 1)
              {
                novaEntidade.idEntidade = idEntidade;
                novaEntidade.idTipoEntidadeCampo = tipoEntidadeCampos[t].id;
                novaEntidade.valor = null;
              }
              else if(tipoEntidadeCampos[t].tipo == 2)
              {
                novaEntidade.idEntidade = idEntidade;
                novaEntidade.idTipoEntidadeCampo = tipoEntidadeCampos[t].id;
                novaEntidade.valor = null;
              }
              else if(tipoEntidadeCampos[t].tipo == 3)
              {
                novaEntidade.idEntidade = idEntidade;
                novaEntidade.idTipoEntidadeCampo = tipoEntidadeCampos[t].id;
                novaEntidade.valor = null;
              }

              entidadeCampos.push(novaEntidade);
            }
            else
            {
              for(var y in entidades[x].entidadeCampos)
              {
                // Pode ser que veio os dados e o mesmos foram somente atualizados pelo usuário
                if( tipoEntidadeCampos.length == entidades[x].entidadeCampos.length && 
                    entidades[x].entidadeCampos[y].idTipoEntidadeCampo == tipoEntidadeCampos[t].id )
                    {
                      entidadeCampos = entidades[x].entidadeCampos;
                    }

                else if( tipoEntidadeCampos.length != entidades[x].entidadeCampos.length && 
                         entidades[x].entidadeCampos[y].idTipoEntidadeCampo == tipoEntidadeCampos[t].id )
                  {
                    if( entidades[x].entidadeCampos != undefined )
                    {
                      entidadeCampos = entidades[x].entidadeCampos;

                      for(var i = 0; i < tipoEntidadeCampos.length - entidades[x].entidadeCampos.length; i++)
                      {
                        var novaEntidade = new EntidadeCampo(null, null, null);
                        if(tipoEntidadeCampos[t].tipo == 1)
                          {
                            novaEntidade.idEntidade = idEntidade;
                            novaEntidade.idTipoEntidadeCampo = tipoEntidadeCampos[t].id;
                          }
                        else if(tipoEntidadeCampos[t].tipo == 2)
                          {
                            novaEntidade.idEntidade = idEntidade;
                            novaEntidade.idTipoEntidadeCampo = tipoEntidadeCampos[t].id;
                          }
                        else if(tipoEntidadeCampos[t].tipo == 3)
                          {
                            novaEntidade.idEntidade = idEntidade;
                            novaEntidade.idTipoEntidadeCampo = tipoEntidadeCampos[t].id;
                          }
                          entidadeCampos.push(novaEntidade);
                      }
                    }
                  }
              }
            }
          }
        }
      }

    return entidadeCampos.sort((a, b) => a.idTipoEntidadeCampo < b.idTipoEntidadeCampo? -1 : a.idTipoEntidadeCampo > b.idTipoEntidadeCampo? 1 : 0);
  } 

  SetarExcluirEntidade(entidade: any) {
    this.nomeEntidadeExcluir = `${entidade.codExterno} - ${entidade.descricao}`;

    this.entidadeExcluir.id = entidade.idEntidade;
    this.entidadeExcluir.IDEntidadePai = entidade.idEntidadePai;
    this.entidadeExcluir.IDTipoEntidade = entidade.idTipoEntidade;
    this.entidadeExcluir.CodExterno = entidade.codExterno;
    this.entidadeExcluir.Descricao = entidade.descricao;
    this.entidadeExcluir.DtInclusao = entidade.dtInclusao;
    this.entidadeExcluir.DtAlteracao = entidade.dtAlteracao;
    this.entidadeExcluir.Ativo = entidade.ativo;

    $('#modalExcluirEntidade').modal('show');
  }

  excluirEntidade() {
    this.entidadeExcluir.Ativo = false;

    this.entidadeService.SaveUpdateEntidade(this.entidadeExcluir).subscribe(resp => {
      if (resp == 'cadastrado com sucesso') {
        $('#modalExcluirEntidade').modal('hide');
        this.notification.MostrarNotificacaoSucesso("Entidade Inativada com Sucesso", "Sucesso");
        if (this.grid.totalRows > 0) {
        this.buscar();
        }
      }
      else { this.notification.MostrarNotificacaoErro("Não foi possível inativar a entidade, tente novamente mais tarde", "Erro") };
    });
  }

  ModificarEntidade() {
    this.entidadeEditar.CodExterno = this.modificarCod;
    this.entidadeEditar.entidadeCampos = this.EntidadeModificar;

    this.entidadeService.SaveUpdateEntidade(this.entidadeEditar).subscribe(resp => {
      if (resp == 'cadastrado com sucesso') {
        $('#modalModificarEntidade').modal('hide');
        this.notification.MostrarNotificacaoSucesso("Entidade modificado com sucesso", "Sucesso");
          this.buscar();
      }else if (resp == 'Desculpe, já possui esse código atrelado a esse tipo de entidade'){
        this.notification.MostrarNotificacaoErro("Desculpe, já possui esse código atrelado a esse tipo de entidade", "Alerta");
        this.limparEntidade();
      }
      else { this.notification.MostrarNotificacaoErro("Não foi possível modificar a entidade, tente novamente mais tarde", "Erro"); }
    });
  }

  Limpar() {
    this.tipoEntidadeId = null;
    this.descricaoEntidade = null;
    this.codExterno = null;
    this.buscaDescricao = null;
    this.ativo = null;
  }

  limparTipoEntidade() {
    this.idTipoEntidade = null;
    this.descricaoEntidade = null;
  }

  limparEntidade() {
    this.TipoEntidadeID = null;
    this.EntidadePaiID = null;
    this.InputCodExterno = null;
    this.InputDescricao = null;
  }

  setPage(){
    this.auth.storePageSize(this.pageSize);
  }

  AdicionarCampo(){
    this.tipoEntidadeCampo = new TipoEntidadeCampo();

    this.tipoEntidadeCampo.codigo = this.siglaTipoEntidadeCampo;
    this.tipoEntidadeCampo.nome = this.nomeTipoEntidadeCampo;
    this.tipoEntidadeCampo.tipo = this.tiposTipoEntidadeCampo;
    this.tipoEntidadeCampo.obrigatorio = this.obrigatorio;

    var validaTipoEntidadeCampoCodigo = this.tiposEntidadeCampos.find(tec => tec.codigo.toUpperCase() == this.siglaTipoEntidadeCampo.toUpperCase());

    if(validaTipoEntidadeCampoCodigo){
      this.notification.MostrarNotificacaoInfo("Código já cadastrado anteriormente","Alerta");
      this.siglaTipoEntidadeCampo = null;
      return;
    }

    if(this.quantidadeArray < 10){
      this.tiposEntidadeCampos.push(this.tipoEntidadeCampo);

      this.siglaTipoEntidadeCampo = null;
      this.nomeTipoEntidadeCampo = null;
      this.tiposTipoEntidadeCampo = null;
      this.obrigatorio = false;

      this.quantidadeArray++;
    }else{
      this.notification.MostrarNotificacaoInfo("Desculpe, só é permitido cadastrar 10 campos", "Alerta");
    }   
  }

  excluirTipoEntidadeCampo(entidade: TipoEntidadeCampo){
    let index = this.tiposEntidadeCampos.findIndex(tec => tec == entidade);

    this.tiposEntidadeCampos.splice(index, 1);
  }

  excluirCampo(campoId: number){
    var campoModificado = this.modificarTipoEntidade.tipoEntidadeCampos.find(tec => tec.id == campoId);
    campoModificado.ativo = false;

    var index = this.modificarTipoEntidade.tipoEntidadeCampos.findIndex(tec => tec.id == campoId);

    this.modificarTipoEntidade.tipoEntidadeCampos.splice(index, 1);
    this.modificarTipoEntidade.tipoEntidadeCampos.push(campoModificado);
  }

  setarValorNovaEntidadeCampo(tipoEntidadeCampos: TipoEntidadeCampo, campoValor?: any, campoData?: Date, )
  {
    if(campoData)
    {
      campoValor = campoData;
    }

      this.entidadeCampo = new EntidadeCampo(null, null, null, null);
      this.entidadeCampo.idTipoEntidadeCampo = tipoEntidadeCampos.id;
      this.entidadeCampo.valor = campoValor;

      this.entidadeCamposSalvar.push(this.entidadeCampo);
  }

  setarValorCampo(entidadeCampo: EntidadeCampo, tipoEntidadeCampos: TipoEntidadeCampo, campoValor?: any, campoData?: Date, ){
    if(campoData){
      campoValor = campoData;
    }
    if(entidadeCampo.id == null && entidadeCampo.idTipoEntidadeCampo != tipoEntidadeCampos.id)
    {
      this.entidadeCampo = new EntidadeCampo(null, null, null, null);
      this.entidadeCampo.idTipoEntidadeCampo = tipoEntidadeCampos.id;
      this.entidadeCampo.valor = campoValor;
  
      this.entidadeCamposSalvar.push(this.entidadeCampo);
    }    
  }

  AdicionarNovoCampoModificar(tipoEntidadeCampos: TipoEntidadeCampo[] ){
    $('#modalModificarTipoEntidade').modal('hide');
    this.tiposEntidadeCampos = tipoEntidadeCampos;
    this.quantidadeArray = tipoEntidadeCampos.length;
    $('#modalAdicionarCampo').modal('show');
  }

  salvarNovosCampos(){
    this.modificarTipoEntidade.tipoEntidadeCampos = this.tiposEntidadeCampos;

    this.entidadeService.SaveUpdateTipoEntidade(this.modificarTipoEntidade).subscribe(resp => {
      if (resp) {
        this.notification.MostrarNotificacaoSucesso("Tipo Entidade salvo com sucesso", "Sucesso");
        this.ngOnInit();
        $('#modalAdicionarCampo').modal('hide');
      }
    });
  }

  limparModalTipoEntidade()
  {
    this.carregandoTipoEntidades = null;
    this.tiposEntidadeCampos = [];
  }

  limparModalEntidade()
  {
    this.TipoEntidadeID = null;
    this.EntidadePaiID = null;
    this.InputCodExterno = null;
    this.InputDescricao = null;
    this.EntidadeCampos = [];
    this.AdicionarEntidadeCampos = [];
    this.entidadeCamposSalvar = [];
  }

}
