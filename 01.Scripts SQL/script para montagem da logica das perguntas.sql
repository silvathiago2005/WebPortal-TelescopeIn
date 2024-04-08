select vc.*, ca.IDPergunta, ca.IDPerguntaAlternativa, ca.RespostaDescritiva, ca.IDColetaAlternativaPai, ca.isPai from vwColeta vc
INNER JOIN ColetaAlternativa ca ON ca.IDColeta = vc.IDColeta
 where vc.IDColeta IS NOT NULL
 AND   vc.IDProjeto  IN ( 2  )
 AND vc.DtInicio > '2018-07-01' and  vc.DtInicio<= '2018-10-04 23:59:00'   AND vc.Duracao > '00:00:00' and  vc.Duracao<= '23:59:00'   
 AND (((ca.IDPergunta = 10 AND ca.RespostaDescritiva like '%Tereza%') 
 AND (ca.IDPergunta = 20 AND ca.RespostaDescritiva > '2018-08-15' AND ca.RespostaDescritiva < '2018-08-20')
 AND (ca.IDPergunta = 23 AND ca.RespostaDescritiva > '500' AND ca.RespostaDescritiva < '1000') 
 AND (ca.IDPergunta = 8 AND ca.IDPerguntaAlternativa IN (23, 24))
 AND (ca.IDPergunta = 4 AND ca.IDPerguntaAlternativa IN (20, 21) AND ca.IDPerguntaAlternativa NOT IN (22))
 AND (ca.IDPergunta = 150 AND ca.IDPergunta > 2 AND ca.IDPergunta < 5)
 AND (ca.IDPergunta = 151 AND ca.IDPerguntaAlternativa IN (7)))
 OR ((ca.IDPergunta = 10 AND ca.RespostaDescritiva like '%Maria%')))
 ORDER BY vc.IDColeta Desc

select Distinct vc.IDColeta, vc.Protocolo, vc.DtInicio, vc.DtTermino, vc.IDUsuario, vc.IDUsuario, vc.NomeUsuario, vc.IDEquipe, vc.NomeEquipe, vc.IDQuestionario, vc.DescQuestionario, vc.IDProjeto, vc.DescProjeto,
                        vc.VersaoApp, vc.Ativo, vc.Latitude, vc.Longitude, vc.DtInclusao, vc.Duracao
						--, ca.IDPergunta, ca.IDPerguntaAlternativa, ca.RespostaDescritiva, ca.IDColetaAlternativaPai, ca.isPai,
						--try_parse( RespostaDescritiva as datetime)  as teste 
						from vwColeta vc
INNER JOIN ColetaAlternativa ca ON ca.IDColeta = vc.IDColeta
 where vc.IDColeta IS NOT NULL
 AND   vc.IDProjeto  IN ( 2  )
 AND vc.DtInicio > '2018-07-01' 
 --and  vc.DtInicio<= '2018-10-08 23:59:00'   AND vc.Duracao > '00:00:00' and  vc.Duracao<= '23:59:00' 
  
 AND (
		(
			vc.IDColeta in
			( select IDColeta from ColetaAlternativa ca1 where  ca.RespostaDescritiva like '%Maria%')
			AND 
			vc.IDColeta in
			( select IDColeta  from ColetaAlternativa ca2 where  ca2.IDPergunta = 20  and try_parse( RespostaDescritiva as datetime) = '2018-08-10')
			--AND ( ca.IDPergunta = 20 AND RespostaDescritiva > '2018-08-10') 
			--AND ( ca.IDPergunta = 23 AND cast(isnull(RespostaDescritiva, 0) as int) > '500' AND RespostaDescritiva < '6000')
		) 
		--OR  
		--(
		--	( ca.IDPergunta = 33 AND ca.IDPerguntaAlternativa IN (78 , 131))
		--)
 )
 ORDER BY vc.IDColeta Desc

select Distinct vc.IDColeta, vc.Protocolo, vc.DtInicio, vc.DtTermino, vc.IDUsuario, vc.NomeUsuario, vc.IDEquipe, vc.NomeEquipe, vc.IDQuestionario, vc.DescQuestionario, vc.IDProjeto, vc.DescProjeto,
                        vc.VersaoApp, vc.Ativo, vc.Latitude, vc.Longitude, vc.DtInclusao, vc.Duracao from vwColeta vc
INNER JOIN ColetaAlternativa ca ON ca.IDColeta = vc.IDColeta
 where vc.IDColeta IS NOT NULL
 AND   vc.IDProjeto  IN ( 2  )
 AND vc.DtInicio > '2018-07-01' and  vc.DtInicio<= '2018-10-08 23:59:00'   AND vc.Duracao > '00:00:00' and  vc.Duracao <= '23:59:00'  AND (
 ( 
 vc.IDColeta in ( select IDColeta from ColetaAlternativa ca0 where ca0.IDPergunta = 10 and ca0.RespostaDescritiva LIKE '%Maria%') AND 
 vc.IDColeta in ( select IDColeta from ColetaAlternativa ca1 where ca1.IDPergunta = 20 and try_parse( ca1.RespostaDescritiva as datetime) = '2018-08-10') AND 
 vc.IDColeta in ( select IDColeta from ColetaAlternativa ca2 where ca2.IDPergunta = 23 and try_parse( ca2.RespostaDescritiva as bigint) > 329 and try_parse( ca2.RespostaDescritiva as bigint)  < 3042) AND 
 vc.IDColeta in ( select IDColeta from ColetaAlternativa ca3 where ca3.IDPergunta = 19 AND ca3.IDPerguntaAlternativa IN (21, 22) AND ca3.IDPerguntaAlternativa NOT IN (20 )
 )
 ) 
 ) 
 ORDER BY vc.IDColeta Desc





















