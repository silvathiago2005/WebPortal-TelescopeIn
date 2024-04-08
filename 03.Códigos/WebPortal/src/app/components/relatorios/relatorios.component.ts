import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { Relatorio, RelatorioRetorno } from 'src/app/models/relatorio.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})

export class RelatoriosComponent implements OnInit {
dtOptions: DataTables.Settings = {}

idUsuario: number
relatorios: Relatorio[]
relatorio: Relatorio = new Relatorio()

buscarRelatorios: boolean = false
dateFormat: string = 'dd/MM/yyyy'
nomeRelatorioTraduzido: string = null
inativandoRelatorio: boolean = null

  constructor(private auth: AuthService, 
              private router: Router, 
              private relService: RelatorioService, 
              private notification: NotificationService, 
              private translate: TranslateService) { 
              this.translate.stream('dateFormat').subscribe(dateformat => this.dateFormat = dateformat) 
  }

  ngOnInit() {
    this.buscarRelatorios = true
    this.idUsuario = this.auth.isLoggedinSuporte()
    this.relService.GetAllByUser().subscribe(retorno => { this.relatorios = retorno; 
                                                          this.buscarRelatorios = false })
  }

  adicionarRelatorio(){
    this.router.navigate(['/Relatorio'], {queryParams: {idRelatorio: "0"}})
  }

  editarRelatorio(relatorio : Relatorio){
    this.router.navigate(['/Relatorio'], { queryParams: {idRelatorio: relatorio.id}})
  }

  inativarRelatorio(relatorio : Relatorio){
    this.inativandoRelatorio = true
    this.relatorio.id = relatorio.id
    this.relatorio.nomeRelatorio = relatorio.nomeRelatorio
    this.relatorio.idQuestionario = relatorio.idQuestionario
    this.relatorio.relatorioParametro = relatorio.relatorioParametro
    this.relatorio.scriptSql = relatorio.scriptSql
    this.relatorio.isGeneric = relatorio.isGeneric
    this.relatorio.ativo = false

    this.relService.SaveRelatorio(this.relatorio).subscribe(retorno => { if(retorno == true){
                                                                            this.inativandoRelatorio = false
                                                                            this.notification.MostrarNotificacaoSucesso("Relatório Excluído!","Sucesso");
                                                                            var ret = this.relatorios.findIndex(r => r.id == relatorio.id)
                                                                            this.relatorios.splice(ret, 1)
                                                                            this.router.navigateByUrl('/Relatorios')
    }else{ 
      this.notification.MostrarNotificacaoErro("Relatório não pode ser excluído!", "Erro")
    }})
  }

  executarRelatorio(relatorio : Relatorio){ 
    relatorio.idQuestionario = (relatorio.idQuestionario == 1)? 0: relatorio.idQuestionario
    this.router.navigate(['/ExecutarRelatorio'], { queryParams: {idRelatorio: relatorio.id, nomeRelatorio: relatorio.nomeRelatorio, idQuestionario: relatorio.idQuestionario}})
   }
}
