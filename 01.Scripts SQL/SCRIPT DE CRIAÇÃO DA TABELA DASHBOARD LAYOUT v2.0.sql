BEGIN TRAN

BEGIN TRY	
	USE [ResearchDev]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON

	DROP TABLE IF Exists [dbo].[DashboardLayout]
	
	CREATE TABLE [dbo].[DashboardLayout](
		[IDDashboardLayout] [bigint] IDENTITY(1,1) NOT NULL,
		[IDUsuario] [int] NOT NULL,	
		[IDQuestionario] [bigint] NOT NULL,
		[Nome] [varchar] (50) NOT NULL,
		[DataInicial] [datetime] NULL,
		[DataFinal] [datetime] NULL,
		[Layout] [varchar] (MAX) NOT NULL,
		[Tipo] [varchar](15) NOT NULL,
		[DtInclusao] [datetime] NOT NULL,
		[DtAlteracao] [datetime] NOT NULL,
		[Ativo] [bit] NOT NULL,
	 CONSTRAINT [PK_DashboardLayout] PRIMARY KEY CLUSTERED 
	(
		[IDDashboardLayout] ASC
	)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[DashboardLayout]  WITH CHECK ADD  CONSTRAINT [FK_DashboardLayout_Questionario] FOREIGN KEY([IDQuestionario])
	REFERENCES [dbo].[Questionario] ([IDQuestionario])
	
	ALTER TABLE [dbo].[DashboardLayout] CHECK CONSTRAINT [FK_DashboardLayout_Questionario]

	ALTER TABLE [dbo].[DashboardLayout] WITH CHECK ADD CONSTRAINT [FK_DashboardLayout_Usuario] FOREIGN KEY([IDUsuario])
	REFERENCES [dbo].[Usuario] ([IDUsuario])

	ALTER TABLE [dbo].[DashboardLayout] CHECK CONSTRAINT [FK_DashboardLayout_Usuario]

	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO