import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ROUTES } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagedListModule } from 'ng-paged-list/paged-list.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { TimePickerModule, DatePickerModule } from '@syncfusion/ej2-ng-calendars';
import { Angular2CsvModule } from 'angular2-csv';
import { DataTablesModule } from 'angular-datatables';
import { GridsterModule } from 'angular2gridster';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxGalleryModule } from 'ngx-gallery';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { TeamsComponent } from './components/teams/teams.component';
import { UserAddTeamComponent } from './components/users/user-add-team/user-add-team.component';
import { TeamUserAddComponent } from './components/teams/team-user-add/team-user-add.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { ExecutarRelatorioComponent } from './components/relatorios/executar-relatorio/executar-relatorio.component';
import { DashboardOperacionalComponent } from './components/dashboard/dashboard-operacional/dashboard-operacional.component';
import { DashboardAnaliticoComponent } from './components/dashboard/dashboard-analitico/dashboard-analitico.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { LineComponent } from './components/graficos/line/line.component';
import { BarsComponent } from './components/graficos/bars/bars.component';
import { BasicAreaComponent } from './components/graficos/basic-area/basic-area.component';
import { PieComponent } from './components/graficos/pie/pie.component';
import { ColumnComponent } from './components/graficos/column/column.component';
import { GridstersComponent } from './components/gridster/gridster.component';
import { ItemComponent } from './components/gridster/item/item.component';
import { TeamProjectAddComponent } from './components/teams/team-project-add/team-project-add.component';
import { MyCustomHeaderInterceptor } from './app.httpInterceptor';
import localePt from '@angular/common/locales/pt';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { ImagensComponent } from './components/imagens/imagens.component';
import { VideosComponent } from './components/videos/videos.component';
import { AudiosComponent } from './components/audios/audios.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RelatorioComponent } from './components/relatorios/relatorio/relatorio.component';
import { HogaresComponent } from './components/nielsen/hogares/hogares.component';
import { ExportacaoDadosComponent } from './components/exportacao-dados/exportacao-dados.component';
import { RatingComponent } from './components/perguntas/rating/rating.component';
import { RadioButtonComponent } from './components/perguntas/radio-button/radio-button.component';
import { CheckboxComponent } from './components/perguntas/checkbox/checkbox.component';
import { CheckboxSimNaoComponent } from './components/perguntas/checkbox-sim-nao/checkbox-sim-nao.component';
import { SelecaoListaExternaComponent } from './components/perguntas/selecao-lista/selecao-lista-externa.component';
import { RespotaLivreComponent } from './components/perguntas/resposta-livre/resposta-livre.component';
import { RespotaLivreDataComponent } from './components/perguntas/respota-livre-data/respota-livre-data.component';
import { RespotaLivreNumericaComponent } from './components/perguntas/respota-livre-numerica/respota-livre-numerica.component';
import { MultiSelecaoCheckboxDimensaoComponent } from './components/perguntas/multi-selecao-checkbox-dimensao/multi-selecao-checkbox-dimensao.component';
import { SimNaoComponent } from './components/perguntas/checkbox-sim-nao/sim-nao/sim-nao.component';
import { InputCheckBoxComponent } from './components/perguntas/checkbox/input-check-box/input-check-box.component';
import { MultiSelecaoComponent } from './components/perguntas/multi-selecao-checkbox-dimensao/multi-selecao/multi-selecao.component';
import { QuestionsComponent } from './components/search/questions/questions.component';
import { RadioComponent } from './components/perguntas/radio-button/radio/radio.component';
import { PerguntaComponent } from './components/perguntas/perguntas.component';
import { ColetasComponent } from './components/coletas/coletas.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

//services
import { TeamService } from './services/teams.service';
import { CustomerService } from './services/customer.service';
import { UserService } from './services/users.service';
import { ProjetoService } from './services/projeto.service';
import { LocalService } from './services/locale.service';
import { HomeModule } from './home/home.module';
import { NotificationService } from './services/notification.service';
import { QuestionarioService } from './services/questionario.service';
import { ColetaService } from './services/coleta.service';
import { AppInsightsService } from './services/app-insights.service';
import { RelatorioService } from './services/relatorio.service';
import { DashboardService } from './services/dashboard.service';
import { ToastrNotification } from './services/toastr.service';
import { MultimidiaComponent } from './components/perguntas/multimidia/multimidia.component';
import { AssinaturaComponent } from './components/assinatura/assinatura.component';
import { CodigoBarrasComponent } from './components/perguntas/codigo-barras/codigo-barras.component';
import { EntidadesComponent } from './components/entidades/entidades.component';
import { EntidadeService } from './services/Entidade.service';
import { PerguntaEntidadeComponent } from './components/perguntas/pergunta-entidade/pergunta-entidade.component';
import { PerguntaInformativaComponent } from './components/perguntas/pergunta-informativa/pergunta-informativa.component';
import { GerenciarSenhaComponent } from './components/login/gerenciar.senha/gerenciar.senha.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { BillingComponent } from './components/billing/billing.component';

registerLocaleData(localePt, 'pt')
registerLocaleData(localeEs, 'es')
registerLocaleData(localeEn, 'en')
//alteração da pasta onde será buscado as traduções, por padrão ele busca na pasta i18n
export function createTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}
export function initTranslation(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    translate.use('en');
    return Promise.resolve();
  };
}


@NgModule({
  declarations: [
    ForbiddenComponent,  
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    TeamsComponent,
    MainComponent,
    AppComponent,
    TeamUserAddComponent,
    TeamProjectAddComponent,
    SidebarComponent,
    UserComponent,
    UsersComponent,
    UserAddTeamComponent,
    ColetasComponent,
    HogaresComponent,
    ExportacaoDadosComponent,
    RatingComponent,
    RadioButtonComponent,  
    CheckboxSimNaoComponent,
    SelecaoListaExternaComponent,
    RespotaLivreComponent,
    RespotaLivreDataComponent,
    RespotaLivreNumericaComponent,
    MultiSelecaoCheckboxDimensaoComponent,
    SimNaoComponent,
    InputCheckBoxComponent,
    MultiSelecaoComponent,
    QuestionsComponent,
    RadioComponent,
    CheckboxComponent,
    PerguntaComponent,
    RelatoriosComponent,
    RelatorioComponent,
    ExecutarRelatorioComponent,
    DashboardOperacionalComponent,
    DashboardAnaliticoComponent,
    GraficosComponent,
    LineComponent,
    BarsComponent,
    BasicAreaComponent,
    PieComponent,
    ColumnComponent,
    GridstersComponent,
    ItemComponent,
    ImagensComponent,
    VideosComponent,
    AudiosComponent,
    MultimidiaComponent,
    AssinaturaComponent,
    CodigoBarrasComponent,
    EntidadesComponent,
    PerguntaEntidadeComponent,
    PerguntaInformativaComponent,
    GerenciarSenhaComponent,
    ScheduleComponent,
    BillingComponent
    ],
  imports: [
    RouterModule.forRoot(ROUTES,{ preloadingStrategy: PreloadAllModules, useHash: false, onSameUrlNavigation: 'reload'}),
    ToastrModule.forRoot(),
    GridsterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2zZ81FY40_0XHDYie2FHl2ZVk464VM58',
      libraries: ["places"]
    }),
    NgxSpinnerModule,
    NgSelectModule,
    DataTablesModule,
    Angular2CsvModule,
    DatePickerModule,
    CommonModule,
    TimePickerModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps:[HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    PagedListModule,
    HomeModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxGalleryModule,
    VgBufferingModule,
    VgControlsModule,
    VgCoreModule,
    ScheduleModule,
    VgOverlayPlayModule
  ],
  providers: [TeamService, CustomerService, UserService, ProjetoService, ToastrNotification, LocalService, 
              NotificationService, QuestionarioService, ColetaService, AppInsightsService, RelatorioService,
              DashboardService, EntidadeService,
              {provide: HTTP_INTERCEPTORS, useClass: MyCustomHeaderInterceptor, multi: true},
              {
                'provide': APP_INITIALIZER,
                'useFactory': initTranslation,
                'deps': [TranslateService],
                'multi': true
              },
            { provide:LOCALE_ID, 
              useValue: 'pt' },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
