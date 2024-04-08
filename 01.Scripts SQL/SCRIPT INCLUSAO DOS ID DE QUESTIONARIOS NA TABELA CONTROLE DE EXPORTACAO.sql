UPDATE ControleExportacao 
   SET IDQuestionario = (SELECT top 1 q.IDQuestionario FROM Questionario q INNER JOIN Projeto p ON p.IDProjeto = q.IDProjeto   WHERE p.IDCliente = ControleExportacao.IDCliente) 
GO
