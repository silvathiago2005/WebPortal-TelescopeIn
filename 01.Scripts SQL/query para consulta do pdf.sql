select * from (	
	select cl.IDCliente, cl.Nome, c.IDUsuario, u.Nome as 'NomeUsuario', pr.Descricao as 'ProjetoDesc', q.IDQuestionario, q.Descricao as 'QuestionarioDesc', c.DtInicio, c.DtTermino,  p.IDPergunta, p.Numero, p.Descricao as 'PerguntaDesc', p.Numero + ' - ' +  p.Descricao as PerguntaNumDesc,
			p.IDTipoPergunta, cm.TipoMidia, cm.CaminhoUrl,
                                
		case
			when( p.IDTipoPergunta = 2  OR   p.IDTipoPergunta = 6 OR  p.IDTipoPergunta = 11 )
			then ca.RespostaDescritiva
	                            
			when( p.IDTipoPergunta =5 and ca.RespostaDescritiva is not null and len(ca.RespostaDescritiva)>0 )
			then CONVERT(VARCHAR(10), cast( ca.RespostaDescritiva as date), 103)

			when( p.IDTipoPergunta =7 OR  p.IDTipoPergunta =9 OR   p.IDTipoPergunta = 3  OR   p.IDTipoPergunta = 4)
			then pa.Descricao
	                            
			when( p.IDTipoPergunta =12)
			then e.Descricao

			when (p.IDTipoPergunta = 13 AND pg.Chave = 'DescricaoInformativa')
			then pg.Valor
		
			else  null
		
		end as Resposta, p.Sequencia

		from Questionario q

		inner join Coleta c
			on c.IDQuestionario = q.IDQuestionario
		inner join Usuario u
			on u.IDUsuario = c.IDUsuario                             	
  
		INNER join Projeto pr
			on q.IDProjeto = pr.IDProjeto
		inner join Cliente cl
			on pr.IDCliente = cl.IDCliente
		inner join Pergunta p
			on q.IDQuestionario = p.IDQuestionario and p.Ativo = 1
		inner join PerguntaAlternativa pa
			on pa.IDPergunta = p.IDPergunta       
		left join ColetaAlternativa ca 
			on c.IDColeta = ca.IDColeta
			and ca.IDPerguntaAlternativa = 	pa.IDPerguntaAlternativa						
		left join Entidade e
			on ca.IDEntidade = e.IDEntidade and e.Ativo = 1
		left join TipoEntidade te
			on te.IDTipoEntidade = e.IDTipoEntidade
		left Join PerguntaConfig pg
			on p.IDPergunta = pg.IDPergunta and pg.Ativo = 1
		left Join ColetaMultimidia cm
			on c.IDColeta = cm.IDColeta 
			And p.IDPergunta = cm.IDPergunta
		where c.IDColeta =@@G1 and (ca.IDColetaAlternativa is not null or ( ca.IDColetaAlternativa is  null and p.IDTipoPergunta = 13  ))
		
		) as Dados
		Where Resposta is not null
		order by Sequencia