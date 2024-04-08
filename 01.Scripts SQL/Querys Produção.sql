select * from Equipe;
select * from Cliente;
select * from Projeto;
select * from Questionario;
select * from Pergunta;
select * from PerguntaAlternativa;
select * from ControleExportacao;
select * from NielsenHogar;
select * from Coleta;
select * from Usuario;
select * from UsuarioCliente;
select * from EquipeUsuario;
select * from EquipeProjeto;
select * from GrupoAcesso;
select * from GrupoUsuario;


--BEGIN TRAN
--DELETE EquipeUsuario
--WHERE IDEquipe in (2, 3, 4, 5, 6, 7, 8, 9)
--DELETE EquipeProjeto
--WHERE IDEquipe in (2, 3, 4, 5, 6, 7, 8, 9)
--DELETE Equipe
--WHERE IDEquipe in (2, 3, 4, 5, 6, 7, 8, 9)
--COMMIT
--ROLLBACK

--BEGIN TRAN
--UPDATE Usuario
--SET Login = 'Maria.Vilalba.consultant'
--WHERE IDUsuario = 257
--COMMIT 
--ROLLBACK

--BEGIN TRAN
--DELETE EquipeUsuario
--WHERE IDUsuario in (209, 211, 212, 213, 214, 215, 216, 217, 218, 219,220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 249)
--DELETE UsuarioCliente
--WHERE IDUsuario in (209, 211, 212, 213, 214, 215, 216, 217, 218, 219,220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 249)
--DELETE  Usuario
--WHERE IDUsuario in (209, 211, 212, 213, 214, 215, 216, 217, 218, 219,220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 249)
--COMMIT
--ROLLBACK
--BEGIN TRAN
--USE [ResearchProd]
--GO

--BEGIN TRAN	
--INSERT INTO [dbo].[Usuario]
--           ([Nome]
--           ,[Login]
--           ,[Senha]
--           ,[Email]
--           ,[DtInclusao]
--           ,[DtAlteracao]
--           ,[Ativo])
--     VALUES
--           ('grupospeedtab1', 'grupospeedtab1', '123456','grupospeedtab1@grupospeed.com', SYSDATETIME(), SYSDATETIME(), 1),
--			('grupospeedtab2', 'grupospeedtab2', '123456','grupospeedtab2@grupospeed.com', SYSDATETIME(), SYSDATETIME(), 1),
--			('grupospeedtab3', 'grupospeedtab3', '123456','grupospeedtab3@grupospeed.com', SYSDATETIME(), SYSDATETIME(), 1),
--			('grupospeedtab4', 'grupospeedtab4', '123456','grupospeedtab4@grupospeed.com', SYSDATETIME(), SYSDATETIME(), 1),
--			('grupospeedtab5', 'grupospeedtab5', '123456','grupospeedtab5@grupospeed.com', SYSDATETIME(), SYSDATETIME(), 1)
--GO
--COMMIT
--ROLLBACK

--BEGIN TRAN
--INSERT into UsuarioCliente
--(IDUsuario, IDCliente)
--VALUES (336, 19), (337, 19),(338, 19),(339, 19),(340, 19)
--INSERT into EquipeUsuario
--(IDUsuario, IDEquipe)
--VALUES (336, 23), (337, 23),(338, 23),(339, 23),(340, 23)
--COMMIT
--ROLLBACK

--insert into GrupoUsuario
--(IDGrupo, IDUsuario)
--values (1,336), (1,337),(1,338),(1,339),(1,340)

--BEGIN TRAN
--DELETE FROM UsuarioCliente
--WHERE IDUsuarioCliente in (1, 2) 
--INSERT INTO UsuarioCliente
--(IDUsuario, IDCliente)
--VALUES (1, 2), (1, 5)
--INSERT INTO EquipeUsuario
--(IDUsuario, IDEquipe)
--VALUES (1, 1), (1, 11)
--COMMIT
--ROLLBACK