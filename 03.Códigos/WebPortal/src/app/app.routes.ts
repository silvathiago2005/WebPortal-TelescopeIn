import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { TeamUserAddComponent } from './components/teams/team-user-add/team-user-add.component';
import { TeamProjectAddComponent } from './components/teams/team-project-add/team-project-add.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { UserAddTeamComponent } from './components/users/user-add-team/user-add-team.component';
import { ColetasComponent } from './components/coletas/coletas.component';
import { webPortalGuard } from './components/security/webportal.guard';
import { HogaresComponent } from './components/nielsen/hogares/hogares.component';
import { ExportacaoDadosComponent } from './components/exportacao-dados/exportacao-dados.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { RelatorioComponent } from './components/relatorios/relatorio/relatorio.component';
import { ExecutarRelatorioComponent } from './components/relatorios/executar-relatorio/executar-relatorio.component';
import { EntidadesComponent } from './components/entidades/entidades.component';
import { GerenciarSenhaComponent } from './components/login/gerenciar.senha/gerenciar.senha.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { BillingComponent } from './components/billing/billing.component';


export const ROUTES: Routes = [
    { path: '', component: MainComponent, resolve: [webPortalGuard] },
    { path: 'Users:to', component: UsersComponent, resolve: [webPortalGuard] },
    { path: 'User:to', component: UserComponent, resolve: [webPortalGuard] },
    { path: 'Login', component: LoginComponent },
    { path: 'GerenciarSenha', component: GerenciarSenhaComponent, resolve: [webPortalGuard] },
    { path: 'Teams', component: TeamsComponent, resolve: [webPortalGuard] },
    { path: 'User', component: UserComponent, resolve: [webPortalGuard] },
    { path: 'Users', component: UsersComponent, resolve: [webPortalGuard] },
    { path: 'Coletas', component: ColetasComponent, resolve: [webPortalGuard]},
    { path: 'UserAddTeam', component: UserAddTeamComponent, resolve: [webPortalGuard]},
    { path: 'AddUser', component: TeamUserAddComponent, resolve: [webPortalGuard] },
    { path: 'Forbidden', component: ForbiddenComponent },
    { path: 'AddProject', component: TeamProjectAddComponent, resolve: [webPortalGuard] },
    { path: 'Relatorios', component: RelatoriosComponent, resolve: [webPortalGuard]},
    { path: 'Relatorio', component: RelatorioComponent, resolve: [webPortalGuard]},
    { path: 'ExecutarRelatorio', component: ExecutarRelatorioComponent, resolve: [webPortalGuard]},
    { path: 'Exportacao', component: ExportacaoDadosComponent, resolve: [webPortalGuard] },
    { path: 'Entidades', component: EntidadesComponent, resolve: [webPortalGuard]},
    { path: 'Schedule', component: ScheduleComponent, resolve: [webPortalGuard]}
    // ,{ path: 'Billing', component: BillingComponent, resolve: [webPortalGuard] }
]