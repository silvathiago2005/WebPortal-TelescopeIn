// export const localhost = 'http://localhost/ResearchWebAPI'
// //Azure Dev
// export const localhost = 'https://telescopeindevapi.azurewebsites.net' 
// //Azure Produção
export const localhost = 'https://telescopeinprodapi.azurewebsites.net'

//url Api´s relacionados a Equipe
export const GetAllEquipeUsuario_API = `${localhost}/api/GetAllEquipeUsuario`
export const GetAllEquipes_API = `${localhost}/api/Equipe/GetAllEquipes`
export const GetAllEquipesByProjeto = `${localhost}/api/Equipe/GetAllEquipesByProjeto`
export const TeamAdd_API = `${localhost}/api/Equipe/AddEquipe`
export const TeamUpdate_API = `${localhost}/api/Equipe/Update`
export const TeamDelete_API = `${localhost}/api/Equipe/Desactive`

//url Api's relacionados a Projeto
export const GetAllProjetoAddEquipe = `${localhost}/api/Projeto/GetAllProjetoAddEquipe`
export const GetAllProjetoByEquipe = `${localhost}/api/Projeto/GetAllProjetoByEquipe`
export const AllProjects_Api = `${localhost}/api/Projeto`
export const AllProjectsCustomer_Api = `${localhost}/api/Projeto/GetAll`

//url Api-s relacionados a Cliente
export const CustomerByUserId_Api = `${localhost}/api/Cliente/GetAllByUser`
export const AccessGroup_Api = `${localhost}/api/Cliente/GrupoAcesso`

//url Api´s relacionados a Usuarios 
export const Usuario_Api = `${localhost}/api/Usuario`
export const LoginTemp_Api = `${localhost}/api/Usuario/LoginTemp`
export const UserCustomer_Api = `${localhost}/api/Usuario/GetAllUsuarioByFilter`
export const NewUser_Api = `${localhost}/api/Usuario/SaveUsuario`
export const DeleteUser_Api = `${localhost}/api/Usuario/DeletarAtivarUsuario`
export const UsuarioClienteByEquipe_API = `${localhost}/api/Usuario/UsuarioClienteByEquipe`
export const GetAllUsuariosByEquipe = `${localhost}/api/Usuario/GetAllUsuariosByEquipe`
export const TrocarSenha = `${localhost}/api/Usuario/TrocarSenha`

//URL Api´s relacionados a Questionario
export const GetAll_Api = `${localhost}/api/Questionario/GetAll`
export const GetAllQuestionarios_Api = `${localhost}/api/Questionario/GetAllByProjeto`
export const GetAllQuestionariosByUser_Api = `${localhost}/api/Questionario/GetAllByUser`
export const GetAllQuestionariosByQuestionario_Api = `${localhost}/api/Questionario`
export const GetAllQuestionarioIdDescricao = `${localhost}/api/Questionario/GetAllIdDescricao`

//URL Api's relacionados a Coleta
export const GetAllColetas = `${localhost}/api/Coleta/GetAll`
export const GetAllRespostasColetas = `${localhost}/api/Resposta/GetAllRespostasColetas`
export const SaveBusca = `${localhost}/api/BuscaSalva/SaveBusca`
export const GetAllBuscaSalva = `${localhost}/api/BuscaSalva/GetAllBuscaSalva`
export const AvaliarColeta = `${localhost}/api/Coleta/AvaliarColeta`
export const PegarAvaliacao = `${localhost}/api/Coleta/GetAvaliacao` 

//URL Api's realacionados a Controle de Exportação
export const GetAllControle = `${localhost}/api/ControleExportacao`

//URL Api's realcionados a Relatorios
export const SaveRelatorio_Api = `${localhost}/api/Relatorio/SaveRelatorio`
export const GetAllByUser_Api = `${localhost}/api/Relatorio/GetAllByUser`
export const GetAllParametrosByRelatorio_Api = `${localhost}/api/Relatorio/GetAllParametrosByRelatorio`
export const GetRelatorio_Api = `${localhost}/api/Relatorio/GetRelatorio`
export const ExecutarRelatorio_Api = `${localhost}/api/Relatorio/Executar`

//URL Api´s relacionados a Dashboard Operacional
export const GetDadosChart = `${localhost}/api/DashboardOperacional/GetDadosChart`
export const SaveUpdateLayout = `${localhost}/api/DashboardOperacional/SaveUpdateLayout`
export const GetDashboardsSalvos = `${localhost}/api/DashboardOperacional/GetLayout`

//URL Api's Relacionados a TipoEntidade
export const GetAllTipoEntidade = `${localhost}/api/TipoEntidade/GetAllTipoEntidade`
export const SaveUpdateTipoEntidade = `${localhost}/api/TipoEntidade/SaveUpdateTipoEntidade`
export const TipoEntidadeById = `${localhost}/api/TipoEntidade/TipoEntidadeById`

//URL Api's relacionados a Entidade
export const GetAllEntidades = `${localhost}/api/Entidade/GetAllEntidades`;
export const SaveUpdateEntidade = `${localhost}/api/Entidade/SaveUpdateEntidade`;
export const GetAllEntidadesPai = `${localhost}/api/Entidade/GetAllEntidadesPai`;

export const GetPDF = `${localhost}/api/Coleta/GetPdf`