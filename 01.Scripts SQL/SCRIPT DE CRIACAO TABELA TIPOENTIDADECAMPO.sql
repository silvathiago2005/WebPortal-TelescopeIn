BEGIN TRAN

BEGIN TRY
	USE [ResearchDev]

	SET ANSI_NULLS ON
	
	SET QUOTED_IDENTIFIER ON

	Drop table if exists TipoEntidadeCampo

CREATE TABLE [dbo].[TipoEntidadeCampo](
	[IDTipoEntidadeCampo] [bigint] IDENTITY(1,1) NOT NULL,
	[IDTipoEntidade] [int] NOT NULL,
	[Codigo] [varchar](5) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
	[Tipo] [tinyint] NOT NULL,
	[Ativo] [bit] NOT NULL,
	[Obrigatorio] [bit] NOT NULL,
	[DtInclusao] [datetime] NULL,
	[DtAlteracao] [datetime] NULL,
 CONSTRAINT [PK_TipoEntidadeCampo] PRIMARY KEY CLUSTERED 
(
	[IDTipoEntidadeCampo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[TipoEntidadeCampo] ADD  DEFAULT ((1)) FOR [Ativo]

ALTER TABLE [dbo].[TipoEntidadeCampo]  WITH CHECK ADD  CONSTRAINT [FK_TipoEntidadeCampo_TipoEntidade] FOREIGN KEY([IDTipoEntidade])
REFERENCES [dbo].[TipoEntidade] ([IDTipoEntidade])

ALTER TABLE [dbo].[TipoEntidadeCampo] CHECK CONSTRAINT [FK_TipoEntidadeCampo_TipoEntidade]
COMMIT TRAN;

END TRY
BEGIN CATCH
	ROLLBACK TRAN;
END CATCH
GO

