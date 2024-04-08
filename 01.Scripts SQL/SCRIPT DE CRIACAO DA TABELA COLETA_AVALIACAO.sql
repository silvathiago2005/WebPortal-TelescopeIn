BEGIN TRAN

BEGIN TRY	
	USE [ResearchDev]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON
	
	CREATE TABLE [dbo].[ColetaAvaliacao](
		[IDColetaAvaliacao] [bigint] IDENTITY(1,1) NOT NULL,
		[IDColeta] [bigint] NULL,
		[Nota] [int] NOT NULL,
		[Observacao] [varchar](MAX) NULL,
		[DtInclusao] [datetime] NOT NULL,
		[DtAlteracao] [datetime] NOT NULL,
		[IDUsuario] [int] NULL,	
	 CONSTRAINT [PK_ColetaAvaliacao] PRIMARY KEY CLUSTERED 
	(
		[IDColetaAvaliacao] ASC
	)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[ColetaAvaliacao]  WITH CHECK ADD  CONSTRAINT [FK_ColetaAvaliacao_Coleta] FOREIGN KEY([IDColeta])
	REFERENCES [dbo].[Coleta] ([IDColeta])
	
	ALTER TABLE [dbo].[ColetaAvaliacao] CHECK CONSTRAINT [FK_ColetaAvaliacao_Coleta]

	ALTER TABLE [dbo].[ColetaAvaliacao] WITH CHECK ADD CONSTRAINT [FK_ColetaAvaliacao_Usuario] FOREIGN KEY([IDUsuario])
	REFERENCES [dbo].[Usuario] ([IDUsuario])

	ALTER TABLE [dbo].[ColetaAvaliacao] CHECK CONSTRAINT [FK_ColetaAvaliacao_Usuario]

	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO