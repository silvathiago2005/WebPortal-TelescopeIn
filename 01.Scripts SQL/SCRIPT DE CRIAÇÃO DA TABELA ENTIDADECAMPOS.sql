BEGIN TRAN

BEGIN TRY
	USE [ResearchDev]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON

	Drop table if exists EntidadeCampo

	CREATE TABLE [dbo].[EntidadeCampo](
		[IDEntidadeCampo] [bigint] IDentity(1,1) NOT NULL,
		[IDEntidade] [bigint] NOT NULL,
		[IDTipoEntidadeCampo] [bigint] NOT NULL,
		[Valor] [varchar](50) NOT NULL,
		CONSTRAINT [PK_EntidadeCampo] PRIMARY KEY CLUSTERED
		( 
			[IDEntidadeCampo] ASC
		)WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF ) ON [PRIMARY]
	) ON [PRIMARY]
	
	ALTER TABLE [dbo].[EntidadeCampo]  WITH CHECK ADD  CONSTRAINT [FK_EntidadeCampo_Entidade] FOREIGN KEY([IDEntidade])
	REFERENCES [dbo].[Entidade] ([IDEntidade])

	ALTER TABLE [dbo].[EntidadeCampo]  WITH CHECK ADD  CONSTRAINT [FK_EntidadeCampo_TipoEntidadeCampo] FOREIGN KEY([IDTipoEntidadeCampo])
	REFERENCES [dbo].[TipoEntidadeCampo] ([IDTipoEntidadeCampo])

	COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO