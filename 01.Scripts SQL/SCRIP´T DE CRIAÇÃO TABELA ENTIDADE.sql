BEGIN TRAN

BEGIN TRY

USE [ResearchDev]

SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON

	Drop table if exists Entidade

	CREATE TABLE [dbo].[Entidade](
		[IDEntidade] [bigint] IDentity(1,1) NOT NULL,
		[IDEntidadePai] [bigint] null,
		[IDTipoEntidade] [int] NOT NULL,
		[CodExterno] [varchar](30) NOT NULL,
		[Descricao] [varchar](200) NOT NULL,
		[Ativo] [bit] NOT NULL,
		[DtInclusao] [DateTime] NOT NULL,
		[DtAlteracao] [Datetime] NOT NULL,
		CONSTRAINT [PK_Entidade] PRIMARY KEY CLUSTERED
		( 
			[IDEntidade] ASC
		)WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF ) ON [PRIMARY]
	)ON [PRIMARY]
	
	ALTER TABLE [dbo].[Entidade]  WITH CHECK ADD  CONSTRAINT [FK_Entidade_TipoEntidade] FOREIGN KEY([IDTipoEntidade])
	REFERENCES [dbo].[TipoEntidade] ([IDTipoEntidade])
	
	ALTER TABLE [dbo].[Entidade] WITH CHECK ADD CONSTRAINT [FK_Entidade_Entidade] FOREIGN KEY([IDEntidadePai])
	REFERENCES [dbo].[Entidade] ([IDEntidade])
	
	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO
