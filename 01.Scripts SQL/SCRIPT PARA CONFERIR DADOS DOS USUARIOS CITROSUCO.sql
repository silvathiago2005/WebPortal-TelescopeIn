select * from 
(
	select 
		len(login) as TamanhoLogin, 
		len(replace(Email, '@citrosuco.com.br','' )) as TamanhoEmail,
		replace(Email, '@citrosuco.com.br','' ) LoginDoEmail
		,  * 
	from usuario
	where Nome like '%citrosuco%'
) as Analise
where TamanhoLogin <> TamanhoEmail
order by 1
