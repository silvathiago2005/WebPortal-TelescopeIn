--Relatorio Geral - Formulário Paciente
select * 
into #tmpColetas
from (	
	select  c.IDcoleta, p.IDPergunta, pa.IDPerguntaAlternativa, p.Numero, p.Descricao as 'PerguntaDesc', p.Numero + ' - ' +  p.Descricao as PerguntaNumDesc,
			p.IDTipoPergunta, p.Sequencia,
                                
		case
			when( p.IDTipoPergunta = 2  OR   p.IDTipoPergunta = 6 OR  p.IDTipoPergunta = 11 )
			then ca.RespostaDescritiva
	                            
			when( p.IDTipoPergunta =5 and ca.RespostaDescritiva is not null and len(ca.RespostaDescritiva)>0 )
			--then CONVERT(VARCHAR(10), cast( ca.RespostaDescritiva as date), 103)
			then ca.RespostaDescritiva

			when( p.IDTipoPergunta =7 OR  p.IDTipoPergunta =9 OR   p.IDTipoPergunta = 3  OR   p.IDTipoPergunta = 4)
			then pa.Descricao
	                            
			when( p.IDTipoPergunta =12)
			then e.Descricao
		
			else  null	
		end as Resposta,
		ec.Valor as 'Divisao'

		from Questionario q

		inner join Coleta c
			on c.IDQuestionario = q.IDQuestionario                           	  
		inner join Pergunta p
			on q.IDQuestionario = p.IDQuestionario and p.Ativo = 1
		inner join PerguntaAlternativa pa
			on pa.IDPergunta = p.IDPergunta       
		inner join ColetaAlternativa ca 
			on c.IDColeta = ca.IDColeta
			and ca.IDPerguntaAlternativa = 	pa.IDPerguntaAlternativa						
		left join Entidade e
			on ca.IDEntidade = e.IDEntidade and e.Ativo = 1
		left join EntidadeCampo ec
			on ec.IDEntidade = e.IDEntidade
		left join TipoEntidade te
			on te.IDTipoEntidade = e.IDTipoEntidade
		where c.IDQuestionario = 26
		) as Dados
		
		Where Resposta is not null
		order by IDColeta

CREATE INDEX IDX_tmpColetas_IDPergunta ON #tmpColetas (IDPergunta)
CREATE INDEX IDX_tmpColetas_IDColeta ON #tmpColetas (IDColeta)

select 
c.IDColeta as 'ID',
CONVERT(VARCHAR(10), DATEADD(hour, -3, c.DtInicio ), 103) as 'Data Entrevista',
convert(VARCHAR(8), DATEADD(hour, -3, c.DtInicio ), 14)  as 'Horário',
u.Nome as 'Profissional da saúde',
u.Cargo as 'Profissão',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1160) as 'Instituição',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1161) as 'Tipo instiuição',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1197) as 'UF',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1198) as 'Cidade',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1199) as 'Médico',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1158) as 'CRM',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1159) as 'UF CRM',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1200)  as 'Representante',
(select top 1 Divisao from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1200)  as 'Divisão',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1156) as 'CPF',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1155) as 'Nome paciente',
(select top 1  DATEDIFF (year,  cast( isnull(Resposta, getdate()) as date), getdate()) from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1151) as 'Idade',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1162) as 'Questionário',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1163) as 'Pontuação',
(
	select
	 SUBSTRING(
	(
		SELECT ', '+ tmp.Resposta
		FROM #tmpColetas tmp
		WHERE  tmp.IDColeta =  c.IDColeta and tmp.IDPergunta = 1165	
		FOR XML PATH ('')
	), 2, 1000) [Respostas]) as 'Diagnóstico',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1164) as 'Estágio do tratamento',

isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1167 and tmp.IDPerguntaAlternativa = 4052), 'Não') as 'ASMA - Paciente Relvar',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1167 and tmp.IDPerguntaAlternativa = 4053), 'Não') as 'ASMA - Paciente Seretide',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4055), 'Não') as 'DPOC - Paciente Anoro',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4054), 'Não') as 'DPOC - Paciente Relvar',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4057), 'Não') as 'DPOC - Paciente Seretide',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4056), 'Não') as 'DPOC - Paciente Vanisto',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1166 and tmp.IDPerguntaAlternativa = 4051), 'Não') as 'RINITE - Paciente Avamys',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4058), 'Não') as 'Outros produtos GSK - Paciente Aerolin',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4059), 'Não') as 'Outros produtos GSK - Paciente Flixotide',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4060), 'Não') as 'Outros produtos GSK - Paciente Nasoclean',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4061), 'Não') as 'Outros produtos GSK - Paciente Zyrtec',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4068), 'Não') as 'Outros produtos - Paciente Alenia',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4066), 'Não') as 'Outros produtos - Paciente Atrovent',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4076), 'Não') as 'Outros produtos - Paciente Bamifix',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4065), 'Não') as 'Outros produtos - Paciente Berotec',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4069), 'Não') as 'Outros produtos - Paciente Busonid',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4070), 'Não') as 'Outros produtos - Paciente Clavulin',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4062), 'Não') as 'Outros produtos - Paciente Clenil',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4086), 'Não') as 'Outros produtos - Paciente Fluir',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4083), 'Não') as 'Outros produtos - Paciente Flutivate',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4064), 'Não') as 'Outros produtos - Paciente Fostair',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4071), 'Não') as 'Outros produtos - Paciente Lugano',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4084), 'Não') as 'Outros produtos - Paciente Maresis',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4080), 'Não') as 'Outros produtos - Paciente Montelair',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4075), 'Não') as 'Outros produtos - Paciente Nasonex',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4078), 'Não') as 'Outros produtos - Paciente Noex',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4087), 'Não') as 'Outros produtos - Paciente Ontrize',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4081), 'Não') as 'Outros produtos - Paciente Oximax',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4074), 'Não') as 'Outros produtos - Paciente Piemonte',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4077), 'Não') as 'Outros produtos - Paciente Predsim',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4088), 'Não') as 'Outros produtos - Paciente Rinosoro',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4073), 'Não') as 'Outros produtos - Paciente Seebri',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4067), 'Não') as 'Outros produtos - Paciente Spiriva',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4072), 'Não') as 'Outros produtos - Paciente Striverdi',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4063), 'Não') as 'Outros produtos - Paciente Symbicort',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4082), 'Não') as 'Outros produtos - Paciente Ultibro',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4079), 'Não') as 'Outros produtos - Paciente Zart',
isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4085), 'Não') as 'Outros produtos - Paciente Zinnat'


from Coleta c
inner join Usuario u
	On c.IDUsuario = u.IDUsuario

where c.IDQuestionario = 26 and c.Ativo = 1	 
AND (DATEADD(HOUR, -3, c.DtInicio ) >= ISNULL(CAST(NULLIF('@@G1', '') as datetime) ,'2017-01-01') 
AND DATEADD(HOUR, -3, c.DtInicio ) <=  DATEADD(dd,1, ISNULL(Cast(NULLIF('@@G2', '')as datetime) , GETDATE()))
order by c.IDColeta desc


--Relatorio Geral V2 - Formulário Paciente
select * 
into #tmpColetas
from (	
	select  c.IDcoleta, p.IDPergunta, pa.IDPerguntaAlternativa, p.Numero, p.Descricao as 'PerguntaDesc', p.Numero + ' - ' +  p.Descricao as PerguntaNumDesc,
			p.IDTipoPergunta, p.Sequencia,
                                
		case
			when( p.IDTipoPergunta = 2  OR   p.IDTipoPergunta = 6 OR  p.IDTipoPergunta = 11 )
			then ca.RespostaDescritiva
	                            
			when( p.IDTipoPergunta =5 and ca.RespostaDescritiva is not null and len(ca.RespostaDescritiva)>0 )
			--then CONVERT(VARCHAR(10), cast( ca.RespostaDescritiva as date), 103)
			then ca.RespostaDescritiva

			when( p.IDTipoPergunta =7 OR  p.IDTipoPergunta =9 OR   p.IDTipoPergunta = 3  OR   p.IDTipoPergunta = 4)
			then pa.Descricao
	                            
			when( p.IDTipoPergunta =12)
			then e.Descricao
		
			else  null	
		end as Resposta,
		ec.Valor as 'Divisao'

		from Questionario q

		inner join Coleta c
			on c.IDQuestionario = q.IDQuestionario                           	  
		inner join Pergunta p
			on q.IDQuestionario = p.IDQuestionario and p.Ativo = 1
		inner join PerguntaAlternativa pa
			on pa.IDPergunta = p.IDPergunta       
		inner join ColetaAlternativa ca 
			on c.IDColeta = ca.IDColeta
			and ca.IDPerguntaAlternativa = 	pa.IDPerguntaAlternativa						
		left join Entidade e
			on ca.IDEntidade = e.IDEntidade and e.Ativo = 1
		left join EntidadeCampo ec
			on ec.IDEntidade = e.IDEntidade
		left join TipoEntidade te
			on te.IDTipoEntidade = e.IDTipoEntidade
		where c.IDQuestionario = 26
		) as Dados
		
		Where Resposta is not null
		order by IDColeta

CREATE INDEX IDX_tmpColetas_IDPergunta ON #tmpColetas (IDPergunta)
CREATE INDEX IDX_tmpColetas_IDColeta ON #tmpColetas (IDColeta)

select 
c.IDColeta as 'ID',
CONVERT(VARCHAR(10), DATEADD(hour, -3, c.DtInicio ), 103) as 'Data Entrevista',
convert(VARCHAR(8), DATEADD(hour, -3, c.DtInicio ), 14)  as 'Horário',
u.Nome as 'Profissional da saúde',
u.Cargo as 'Profissão',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1160) as 'Instituição',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1161) as 'Tipo instiuição',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1197) as 'UF',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1198) as 'Cidade',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1199) as 'Médico',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1158) as 'CRM',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1159) as 'UF CRM',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1200)  as 'Representante',
(select top 1 Divisao from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1200)  as 'Divisão',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1156) as 'CPF',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1155) as 'Nome paciente',
(select top 1  DATEDIFF (year,  cast( isnull(Resposta, getdate()) as date), getdate()) from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1151) as 'Idade',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1162) as 'Questionário',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1163) as 'Pontuação',
(
	select
	 SUBSTRING(
	(
		SELECT ', '+ tmp.Resposta
		FROM #tmpColetas tmp
		WHERE  tmp.IDColeta =  c.IDColeta and tmp.IDPergunta = 1165	
		FOR XML PATH ('')
	), 2, 1000) [Respostas]) as 'Diagnóstico',
(select top 1 Resposta from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1164) as 'Estágio do tratamento',

--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1167 and tmp.IDPerguntaAlternativa = 4052), 'Não') as 'ASMA - Paciente Relvar',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1167 and tmp.IDPerguntaAlternativa = 4053), 'Não') as 'ASMA - Paciente Seretide',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4055), 'Não') as 'DPOC - Paciente Anoro',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4054), 'Não') as 'DPOC - Paciente Relvar',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4057), 'Não') as 'DPOC - Paciente Seretide',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1168 and tmp.IDPerguntaAlternativa = 4056), 'Não') as 'DPOC - Paciente Vanisto',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1166 and tmp.IDPerguntaAlternativa = 4051), 'Não') as 'RINITE - Paciente Avamys',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4058), 'Não') as 'Outros produtos GSK - Paciente Aerolin',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4059), 'Não') as 'Outros produtos GSK - Paciente Flixotide',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4060), 'Não') as 'Outros produtos GSK - Paciente Nasoclean',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1169 and tmp.IDPerguntaAlternativa = 4061), 'Não') as 'Outros produtos GSK - Paciente Zyrtec',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4068), 'Não') as 'Outros produtos - Paciente Alenia',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4066), 'Não') as 'Outros produtos - Paciente Atrovent',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4076), 'Não') as 'Outros produtos - Paciente Bamifix',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4065), 'Não') as 'Outros produtos - Paciente Berotec',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4069), 'Não') as 'Outros produtos - Paciente Busonid',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4070), 'Não') as 'Outros produtos - Paciente Clavulin',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4062), 'Não') as 'Outros produtos - Paciente Clenil',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4086), 'Não') as 'Outros produtos - Paciente Fluir',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4083), 'Não') as 'Outros produtos - Paciente Flutivate',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4064), 'Não') as 'Outros produtos - Paciente Fostair',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4071), 'Não') as 'Outros produtos - Paciente Lugano',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4084), 'Não') as 'Outros produtos - Paciente Maresis',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4080), 'Não') as 'Outros produtos - Paciente Montelair',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4075), 'Não') as 'Outros produtos - Paciente Nasonex',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4078), 'Não') as 'Outros produtos - Paciente Noex',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4087), 'Não') as 'Outros produtos - Paciente Ontrize',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4081), 'Não') as 'Outros produtos - Paciente Oximax',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4074), 'Não') as 'Outros produtos - Paciente Piemonte',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4077), 'Não') as 'Outros produtos - Paciente Predsim',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4088), 'Não') as 'Outros produtos - Paciente Rinosoro',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4073), 'Não') as 'Outros produtos - Paciente Seebri',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4067), 'Não') as 'Outros produtos - Paciente Spiriva',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4072), 'Não') as 'Outros produtos - Paciente Striverdi',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4063), 'Não') as 'Outros produtos - Paciente Symbicort',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4082), 'Não') as 'Outros produtos - Paciente Ultibro',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4079), 'Não') as 'Outros produtos - Paciente Zart',
--isNULL((select top 1 'Sim'  from #tmpColetas  tmp where tmp.IDColeta = c.IDColeta and tmp.IDPergunta  =1170 and tmp.IDPerguntaAlternativa = 4085), 'Não') as 'Outros produtos - Paciente Zinnat',
t.tratamento as 'Tratamento'


from Coleta c
inner join Usuario u
	On c.IDUsuario = u.IDUsuario
inner join ( 
	SELECT col.IDColeta,p.Descricao+' - Paciente '+ pa.Descricao as 'Tratamento' 
	FROM Coleta col
	INNER JOIN ColetaAlternativa ca
		ON ca.IDColeta = col.IDColeta
		Inner Join Pergunta p
		ON ca.IDPergunta = p.IDPergunta
	INNER JOIN PerguntaAlternativa pa
		ON pa.IDPerguntaAlternativa = ca.IDPerguntaAlternativa
	
	WHERE pa.IDPergunta IN (1166, 1167, 1168, 1169, 1170)
) as t
	ON c.IDColeta = t.IDColeta

where c.IDQuestionario = 26 and c.Ativo = 1	 
AND (DATEADD(HOUR, -3, c.DtInicio ) >= ISNULL(CAST(NULLIF('@@G1', '') as datetime) ,'2017-01-01') 
AND DATEADD(HOUR, -3, c.DtInicio ) <=  DATEADD(dd,1, ISNULL(Cast(NULLIF('@@G2', '')as datetime) , GETDATE()))
order by c.IDColeta desc

--Quantidade por Alternativa de cada Pergunta
SELECT p.Numero AS NumeroPergunta, p.Descricao AS DescricaoPergunta, pa.PosicaoLinha AS NumeroAlternativa, pa.Descricao AS DescricaoAlternativa, 
	  COUNT(ca.IDColetaAlternativa) AS Quantidade  
	  FROM Coleta c 
	  INNER JOIN ColetaAlternativa ca        
		on c.IDColeta = ca.IDColeta INNER JOIN PerguntaAlternativa pa        
		on  ca.IDPerguntaAlternativa = pa.IDPerguntaAlternativa INNER JOIN Pergunta p        
		ON ca.IDPergunta = p.IDPergunta 
	  WHERE c.IDQuestionario = @@G3
		AND c.DtInicio >= ISNULL(CAST(NULLIF('@@G1', '') as datetime) ,'2017-01-01')   
		AND c.DtInicio  <= DATEADD(dd,1, ISNULL(Cast(NULLIF('@@G2', '')as datetime) , GETDATE())) 
	  GROUP BY  p.Numero, p.Descricao, pa.PosicaoLinha, pa.Descricao 
	  ORDER BY p.Numero

--Produtividade por Usuario
SELECT u.Nome AS NomeUsuario,    u.Login,    u.Email, e.Nome AS NomeEquipe,    q.Descricao AS QuestionarioDescricao,    
		count(c.IDColeta) AS Quantidade,    
		CAST( avg(Datediff(MINUTE, '00:00:00', c.Duracao ) ) AS BIGINT) as TempoMedio    
		FROM Usuario u    
		INNER JOIN vwColeta c  
			ON c.IDUsuario = u.IDUsuario    
		INNER JOIN Equipe e  
			ON e.IDEquipe = c.IDEquipe     
		INNER JOIN EquipeProjeto ep  
			ON ep.IDEquipe = e.IDEquipe    
		INNER JOIN Questionario q  
			ON q.IDProjeto = ep.IDProjeto  
WHERE q.IDQuestionario = @@G3 
		AND c.DtInicio >= ISNULL(CAST(NULLIF('@@G1', '') as datetime) ,'2017-01-01')   
		AND c.DtInicio <= DATEADD(dd,1, ISNULL(Cast(NULLIF('@@G2', '')as datetime) , GETDATE()))  
GROUP BY u.Nome, u.Login, u.Email, e.Nome, q.Descricao  
ORDER BY Quantidade Desc

--Produtividade por Equipe
SELECT e.Nome AS NomeEquipe, q.Descricao AS QuestionarioDescricao, 
	Count(c.IDColeta) AS Quantidade   
FROM Coleta c 
	INNER JOIN Equipe e  
		ON e.IDEquipe = c.IDEquipe 
	INNER JOIN Questionario q  
		ON q.IDQuestionario = c.IDQuestionario  
WHERE q.IDQuestionario = @@G3
	AND c.DtInicio >= ISNULL(CAST(NULLIF('@@G1', '') as datetime) ,'2017-01-01')   
	AND c.DtInicio <= DATEADD(dd,1, ISNULL(Cast(NULLIF('@@G2', '')as datetime) , GETDATE())) 
GROUP BY e.Nome, q.Descricao 
ORDER BY e.Nome

-- Produtividade dia a dia
SELECT q.Descricao AS QuestionarioDescricao,      
	   CAST( CONVERT(date, c.DtInicio) AS varchar) AS DataRelatorio,     
	   COUNT(c.IDColeta) AS Quantidade, SUM(COUNT(c.IDColeta)) OVER (ORDER BY CAST( CONVERT(date, c.DtInicio) AS varchar)) AS QuantidadeAcumulada    
FROM Coleta c   
	 INNER JOIN Questionario q   
		ON q.IDQuestionario = c.IDQuestionario   
WHERE q.IDQuestionario = @@G3
	AND c.DtInicio >= ISNULL(CAST(NULLIF('@@G1', '') as datetime) ,'2017-01-01') 
	AND c.DtInicio <= DATEADD(dd,1, ISNULL(Cast(NULLIF('@@G2', '')as datetime) , GETDATE())) 
GROUP BY q.Descricao,       
		CAST( CONVERT(date, c.DtInicio) AS varchar)    
ORDER BY 2 ASC