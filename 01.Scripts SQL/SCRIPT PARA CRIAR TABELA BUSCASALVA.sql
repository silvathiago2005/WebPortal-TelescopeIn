BEGIN TRAN

BEGIN TRY	
	USE [ResearchDev]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON
	
	CREATE TABLE [dbo].[BuscaSalva](
		[IDBuscaSalva] [bigint] IDENTITY(1,1) NOT NULL,
		[IDUsuario] [int] NOT NULL,
		[NomeBusca] [varchar](50) NOT NULL,
		[JsonBusca] [varchar](1000) NOT NULL,
		[DtInclusao] [datetime] NULL,
		[DtAlteracao] [datetime] NULL,
		[Ativo] [bit] NOT NULL,	
	 CONSTRAINT [PK_BuscaSalva] PRIMARY KEY CLUSTERED 
	(
		[IDBuscaSalva] ASC
	)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[BuscaSalva]  WITH CHECK ADD  CONSTRAINT [FK_BuscaSalva_Usuario] FOREIGN KEY([IDUsuario])
	REFERENCES [dbo].[Usuario] ([IDUsuario])
	
	ALTER TABLE [dbo].[BuscaSalva] CHECK CONSTRAINT [FK_BuscaSalva_Usuario]

	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO