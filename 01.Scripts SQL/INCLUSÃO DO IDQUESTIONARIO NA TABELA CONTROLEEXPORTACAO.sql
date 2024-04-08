
BEGIN TRAN a
BEGIN TRY
	ALTER TABLE [dbo].[ControleExportacao] ADD IDQuestionario BIGINT NULL

	ALTER TABLE [dbo].[ControleExportacao]  WITH CHECK ADD  CONSTRAINT [FK_ControleExportacao_Questionario] FOREIGN KEY([IDQuestionario])
	REFERENCES [dbo].[Questionario] ([IDQuestionario])

	ALTER TABLE [dbo].[ControleExportacao] CHECK CONSTRAINT [FK_ControleExportacao_Questionario]

	COMMIT TRAN a;
	SELECT 'Sucesso' as Res
END TRY
BEGIN CATCH
ROLLBACK TRAN a;
	SELECT 'Erro' as Res
END CATCH;