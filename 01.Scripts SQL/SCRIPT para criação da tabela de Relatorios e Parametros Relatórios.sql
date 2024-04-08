BEGIN TRAN

BEGIN TRY	
	USE [ResearchProd]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON
	--Criação da tabela de Relatórios
	CREATE TABLE [dbo].[Relatorio](
		[IDRelatorio] [bigint] IDENTITY(1,1) NOT NULL,
		[IDQuestionario] [bigint] NOT NULL,
		[NomeRelatorio] [varchar](50) NOT NULL,
		[ScriptSql] [varchar](MAX) NOT NULL,
		[DtInclusao] [datetime] NOT NULL,
		[DtAlteracao] [datetime] NOT NULL,
		[Ativo] [bit] NOT NULL,	
	 CONSTRAINT [PK_Relatorio] PRIMARY KEY CLUSTERED 
	(
		[IDRelatorio] ASC
	)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]

	ALTER TABLE [dbo].[Relatorio]  WITH CHECK ADD  CONSTRAINT [FK_Relatorio_Questionario] FOREIGN KEY([IDQuestionario])
	REFERENCES [dbo].[Questionario] ([IDQuestionario])
	
	ALTER TABLE [dbo].[Relatorio] CHECK CONSTRAINT [FK_Relatorio_Questionario]

	--Criação da tabela de parâmetros Relatório
	CREATE TABLE [dbo].[RelatorioParametro](
		[IDRelatorioParametro] [bigint] IDENTITY(1,1) NOT NULL,
		[IDRelatorio] [bigint] NOT NULL,
		[Sigla] [varchar](10) NOT NULL,
		[NomeParametro] [varchar](50) NOT NULL,
		[TipoParametro] [tinyint] NOT NULL,
	 CONSTRAINT [PK_ParametroRelatorio] PRIMARY KEY CLUSTERED 
	(
		[IDRelatorioParametro] ASC
	)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[RelatorioParametro]  WITH CHECK ADD  CONSTRAINT [FK_RelatorioParametro_Relatorio] FOREIGN KEY([IDRelatorio])
	REFERENCES [dbo].[Relatorio] ([IDRelatorio])
	
	ALTER TABLE [dbo].[RelatorioParametro] CHECK CONSTRAINT [FK_RelatorioParametro_Relatorio]

	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO