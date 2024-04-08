SELECT 'Hoje' AS Periodo, COUNT(c.IDColeta) As Media
		FROM Coleta c
		WHERE CAST(c.DtInclusao AS date) 
				Like CONVERT(date, GETDATE())
				AND c.IDQuestionario = 2
UNION ALL
		SELECT 'Ontem' AS Periodo, COUNT(c.IDColeta) As Media
		FROM Coleta c
		WHERE CAST(c.DtInclusao AS date) 
				Like CAST(DATEADD(DAY, -1, CONVERT(date, GETDATE())) AS date) 
				AND c.IDQuestionario = 2
UNION ALL
		SELECT 'Ultimos 7 dias' AS Periodo, COUNT(c.IDColeta)/7 As Media
		FROM Coleta c
		WHERE CAST(c.DtInclusao AS date) 
				BETWEEN CAST(DATEADD(Day, -7, CONVERT(date, GETDATE())) AS date) 
				AND CAST(DATEADD(Day, -1, CONVERT(date, GETDATE())) AS date) 
				AND c.IDQuestionario = 2   
UNION ALL
		SELECT 'Ultimos 30 dias' AS Periodo, COUNT(c.IDColeta)/30 As Media
		FROM Coleta c
		WHERE CAST(c.DtInclusao AS date) 
				BETWEEN CAST(DATEADD(Day, -30, CONVERT(date, GETDATE())) AS date) 
				AND CAST(DATEADD(Day, -1, CONVERT(date, GETDATE())) AS date)  
				AND c.IDQuestionario = 2

--SELECT 'Diario' AS Periodo, COUNT(c.IDColeta) As Media
--FROM Coleta c
--Where CAST(c.DtInclusao AS date) Like '2018-08-29'
--UNION ALL
--SELECT 'Ontem' AS Periodo, COUNT(c.IDColeta) As Media
--FROM Coleta c
--Where CAST(c.DtInclusao AS date) Like CAST(DATEADD(DAY, -1, '2018-08-29') AS date)
--UNION ALL
--SELECT 'Média Semanal' AS Periodo, COUNT(c.IDColeta)/7 As Media
--FROM Coleta c
--Where CAST(c.DtInclusao AS date) BETWEEN CAST(DATEADD(Day, -7, '2018-08-29') AS date) AND CAST(DATEADD(Day, -1, '2018-08-29') AS date)    
--UNION ALL
--SELECT 'Média Mensal' AS Periodo, COUNT(c.IDColeta)/30 As Media
--FROM Coleta c
--Where CAST(c.DtInclusao AS date) BETWEEN CAST(DATEADD(Day, -30, '2018-08-29') AS date) AND CAST(DATEADD(Day, -1, '2018-08-29') AS date)  
--AND c.IDQuestionario = 2

