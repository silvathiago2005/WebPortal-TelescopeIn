BEGIN TRAN

--deletar ColetaAlternativa
DELETE FROM ColetaAlternativa
	  WHERE IDColeta IN (
	  SELECT IDColeta FROM Coleta WHERE IDEquipe IN (
	  SELECT IDEquipe FROM Equipe WHERE IDCliente IN (11, 14, 15, 22)))

--deletar Coleta
DELETE FROM Coleta
	  WHERE IDEquipe IN (  
	 SELECT IDEquipe FROM Equipe WHERE IDCliente IN (11, 14, 15, 22))

--deletar PerguntaAlternativa
DELETE FROM PerguntaAlternativa
      WHERE IDPergunta IN (
	 SELECT IDPergunta FROM Pergunta  WHERE IDQuestionario IN (
	 SELECT IDQuestionario FROM Questionario WHERE IDProjeto IN (
	 SELECT IDProjeto FROM Projeto WHERE IDCliente IN (11, 14, 15, 22))))

--deltar Pergunta
DELETE FROM Pergunta
	  WHERE  IDQuestionario IN (
	 SELECT IDQuestionario FROM Questionario WHERE IDProjeto IN (
	 SELECT IDProjeto FROM Projeto WHERE IDCliente IN (11, 14, 15, 22)))

--deletar Secao Pergunta
DELETE FROM SecaoPergunta
	  WHERE IDQuestionario IN (
	 SELECT IDQuestionario FROM Questionario WHERE IDProjeto IN (
	 SELECT IDProjeto FROM Projeto WHERE IDCliente IN (11, 14, 15, 22)))

--Deletar Questionario
DELETE FROM Questionario
	  WHERE IDProjeto IN (
	 SELECT IDProjeto FROM Projeto WHERE IDCliente IN (11, 14, 15, 22))

DELETE FROM EquipeProjeto
	  WHERE IDProjeto IN (
	  SELECT IDProjeto FROM Projeto WHERE IDCliente IN (11, 14, 15, 22))

--deletar Projeto
DELETE FROM Projeto
	  WHERE IDCliente IN (11, 14, 15, 22)

COMMIT 
--ROLLBACK