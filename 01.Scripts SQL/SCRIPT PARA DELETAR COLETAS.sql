--BEGIN TRAN
----Deleta todas as coletas alternativas
--DELETE FROM ColetaAlternativa
--	  WHERE IDColeta IN (21623) 

----Deleta as coletas multimidias atreladas as coletas
--DELETE FROM ColetaMultimidia
--	  WHERE IDColeta IN (21623) 

----Deleta as Coletas Avalia��o atreladas a coletas
--DELETE FROM ColetaAvaliacao
--	WHERE IDColeta IN (21623)

----deletar Coleta
--DELETE FROM Coleta
--	  WHERE IDColeta IN (21623)


--ROLLBACK
--COMMIT

--selects para valida��o de quantidade de coletas do cliente
--SELECT * FROM ColetaAlternativa
--	  WHERE IDColeta IN (21623) 

--SELECT * FROM ColetaMultimidia
--	  WHERE IDColeta IN (21623) 

--SELECT * FROM ColetaAvaliacao
--	WHERE IDColeta IN (21623) 

--SELECT * FROM Coleta
--	  WHERE IDColeta IN (21623) 