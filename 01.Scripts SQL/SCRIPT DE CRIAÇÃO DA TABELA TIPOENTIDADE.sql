BEGIN TRAN

BEGIN TRY
	USE [ResearchDev]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON

	Drop table if exists TipoEntidade

	CREATE TABLE [dbo].[TipoEntidade](
		[IDTipoEntidade] [int] IDentity(1,1) NOT NULL,
		[IDCliente] [int] NOT NULL,
		[IDTipoEntidadePai] [int],
		[Descricao] [varchar](200) NOT NULL,
		[DtInclusao] [Datetime],
		[DtAlteracao] [Datetime],
		[Ativo] [bit] NOT NULL,
		CONSTRAINT [PK_TipoEntidade] PRIMARY KEY CLUSTERED
		( 
			[IDTipoEntidade] ASC
		)WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF ) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[TipoEntidade] ADD DEFAULT ((1)) FOR [Ativo]

	ALTER TABLE [dbo].[TipoEntidade]  WITH CHECK ADD  CONSTRAINT [FK_TipoEntidade_Cliente] FOREIGN KEY([IDCLiente])
	REFERENCES [dbo].[Cliente] ([IDCliente])
	
	ALTER TABLE [dbo].[TipoEntidade] WITH CHECK ADD CONSTRAINT [FK_TipoEntidade_TipoEntidade] FOREIGN KEY([IDTipoEntidadePai])
	REFERENCES [dbo].[TipoEntidade] ([IDTipoEntidade])

	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO