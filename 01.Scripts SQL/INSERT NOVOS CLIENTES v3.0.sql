DECLARE @idCliente INT = 0;
DECLARE @idUsuario INT = 0;
DECLARE @idEquipe INT=	0;
DECLARE @idProjeto INT = 0;
DECLARE @nomeCliente varchar (50) = 'xxxxxxxxxxxxxxx'; 
DECLARE @nomeUsuario varchar(50) =  'xxxxxxxxxxxxxxx';
DECLARE @login varchar(50) = 'xxxxxxxxxxxxxxx';
DECLARE @senha varchar(50) = 'xxxxxxxxxxxxxxx';
DECLARE @email varchar(50) = 'xxxxxxxxxxxxxxx';
DECLARE @data as DATETIME = getdate();
DECLARE @nomeEquipe varchar(50) = 'xxxxxxxxxxxxxxx'
DECLARE @descricaoProjeto varchar(50) = 'xxxxxxxxxxxxxxx'
DECLARE @DescricaoQuestionario varchar(50) = 'xxxxxxxxxxxxxxx'

BEGIN TRAN a
BEGIN TRY
	USE [ResearchProd]

	----para testar se o script esta ok
	--SET NOEXEC OFF;
	
	--faz a inclusão do cliente e pega o numero do id para usar posteriormente
	INSERT INTO [dbo].[Cliente]
           ([Nome] ,[Ativo] ,[DtInclusao])
		VALUES
           (@nomeCliente, 1 ,@data)

	SELECT @idCliente = (SELECT IDCliente FROM [dbo].[Cliente] WHERE Nome = @nomeCliente);

	--faz a inclusão do usuario e depois pega o id para incluir nas outras tabelas
	INSERT INTO [dbo].[Usuario]
           ([Nome],[Login],[Senha],[Email],[DtInclusao],[DtAlteracao],[Ativo], [IDGrupo])
		VALUES
           (@nomeUsuario, @login, @senha, @email, @data, @data, 1, 5)

	SELECT @idUsuario = (SELECT IDUsuario FROM [dbo].[Usuario] WHERE Nome = @nomeUsuario);

	--faz a inclusão da equipe e pega o id para inserir nas demais tabelas
	INSERT INTO [dbo].[Equipe]
           ([IDCliente],[Nome],[Ativo],[DtInclusao],[DtAtualizacao])
     VALUES
           (@idCliente, @nomeEquipe, 1, @data, @data)

	SELECT @idEquipe = (SELECT IDEquipe FROM [dbo].[Equipe] WHERE Nome = @nomeEquipe);

	--faz a inclusão do projeto e depois pega o id para usar nas outras tabelas
	INSERT INTO [dbo].[Projeto]
           ([IDCliente],[Descricao],[Ativo])
     VALUES
           (@idCliente, @descricaoProjeto, 1)
		   
	SELECT @idProjeto = (SELECT IDProjeto FROM [dbo].[Projeto] WHERE Descricao = @descricaoProjeto);

	INSERT INTO [dbo].[Questionario]
			([IDProjeto],[Descricao],[Ativo],[IDQuestionarioRef], [Versao], [DtInicioVigencia], [DtFimVigencia], [QtdMeta])
	VALUES
			(@idProjeto, @DescricaoQuestionario, 1, null, 1, @data, @data, 1000)

	INSERT INTO [dbo].[UsuarioCliente]
           ([IDUsuario],[IDCliente])
     VALUES
			(1, @idCliente),
           (@idUsuario, @idCliente)
	
	INSERT INTO [dbo].[EquipeProjeto]
           ([IDEquipe],[IDProjeto])
     VALUES
           (@idEquipe,@idProjeto)

	INSERT INTO [dbo].[EquipeUsuario]
           ([IDUsuario],[IDEquipe])
     VALUES
			(1, @idEquipe),
           (@idUsuario,@idEquipe)	
	
	INSERT INTO [dbo].[GrupoUsuario]
           ([IDGrupo],[IDUsuario])
     VALUES
           (1,@idUsuario)

	COMMIT TRAN a;
	select 'Sucesso' as Res
END TRY
BEGIN CATCH
	ROLLBACK TRAN a;
	select 'Erro' as Res
END CATCH;

