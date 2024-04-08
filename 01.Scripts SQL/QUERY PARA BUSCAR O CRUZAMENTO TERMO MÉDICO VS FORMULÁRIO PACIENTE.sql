SELECT 
FormPaciente.IDColeta as 'ID Formulário Paciente',
FormPaciente.[Nome Paciente],
FormPaciente.[CPF Paciente],
FormPaciente.[Sexo],
FormPaciente.[Data Nascimento],
FormPaciente.[Nome do Profissional],
FormPaciente.[Instituição Formulário Paciente],
CAST(FormPaciente.DtInicio as Date) AS 'Data da Coleta Formulário Paciente', 
FormPaciente.[Versão do APP],
		CASE
			WHEN TermoMedico.[ID Coleta Termo] IS NULL 
			THEN 'Não Encontrado'
		
			ELSE  'Encontrado'	
		END AS 'Termo Médico', 
	CASE
		WHEN  FormPaciente.IDEntidade IS NULL 
		THEN 'Instituição não Selecionada / Cadastro Manual'

		ELSE 'Instituição Selecionada'
	END AS 'Instituição',
	
TermoMedico.[ID Coleta Termo] AS 'ID Termo Médico',
TermoMedico.Data AS 'Data Termo Médico', 
TermoMedico.[Médico Responsavel], 
TermoMedico.CRM,
TermoMedico.[Instituição Termo Médico]
FROM 
(
	SELECT
	c.IDColeta,
	c.DtInicio,
	c.Ativo,
	c.VersaoAPP AS 'Versão do APP',
	( SELECT u.Nome FROM Usuario u WHERE u.IDUsuario = c.IDUsuario ) AS 'Nome do Profissional',
	( SELECT top 1 ca.RespostaDescritiva FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1155 ) AS 'Nome Paciente',
	( SELECT top 1 ca.RespostaDescritiva FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1156 ) AS 'CPF Paciente',
	( select top 1 pa.Descricao from ColetaAlternativa ca inner join PerguntaAlternativa pa on pa.IDPerguntaAlternativa = ca.IDPerguntaAlternativa where ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1157 ) AS 'Sexo',
	( SELECT top 1 ca.RespostaDescritiva FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1151 ) AS 'Data Nascimento',
	( SELECT top 1 ca.IDEntidade FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1479 ) AS 'IDEntidade',
	( SELECT TOP 1 e.Descricao FROM ColetaAlternativa ca INNER JOIN Entidade e ON ca.IDEntidade = e.IDEntidade WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1479 ) AS 'Instituição Formulário Paciente'
	FROM Coleta c
	WHERE c.IDQuestionario = 26
) AS FormPaciente
LEFT JOIN ( 
			SELECT c.IDColeta AS 'ID Coleta Termo' , CAST( c.DtInicio AS Date ) AS 'Data', 
			( SELECT ca.IDEntidade FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1480 ) AS 'ID Entidade',
			( SELECT ca.RespostaDescritiva FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1148 ) AS 'Médico Responsavel',
			( SELECT ca.RespostaDescritiva FROM ColetaAlternativa ca WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1146 ) AS 'CRM',
			( SELECT e.Descricao FROM ColetaAlternativa ca INNER JOIN Entidade e ON ca.IDEntidade = e.IDEntidade WHERE ca.IDColeta = c.IDColeta AND ca.IDPergunta = 1480 ) AS 'Instituição Termo Médico'
			FROM Coleta c
			WHERE c.IDQuestionario = 25
				AND c.Ativo = 1
		) AS TermoMedico
	 ON
	  CAST(FormPaciente.DtInicio AS Date) = TermoMedico.Data
	  AND FormPaciente.IDEntidade = TermoMedico.[ID Entidade]
	  AND FormPaciente.Ativo = 1 
	  AND FormPaciente.DtInicio >= '2019-04-01'
	  AND FormPaciente.DtInicio < DATEADD(dd,1, '2019-04-30')

ORDER BY FormPaciente.IDColeta DESC