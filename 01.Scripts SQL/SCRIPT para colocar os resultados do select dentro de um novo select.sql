--pegar os dados de SecaoPergunta
SELECT 'INSERT INTO SecaoPergunta VALUES('+CONVERT(varchar,10006)+',
											'''+sp.Nome+''',
											'+CONVERT(varchar,sp.IDTipoSecao)+',
											'''+ ISNULL( sp.ConteudoInformativo, '')+''',
											'+CONVERT(varchar,sp.Sequencia)+',
											'''+ ISNULL(sp.Descricao,'') +''',
											'''+ ISNULL( sp.ImagemUrl,'')+''')' 
											AS INSERTS
from SecaoPergunta as sp
where IDQuestionario = 21

--pegar os dados de 
SELECT 'INSERT INTO SecaoPergunta VALUES('+CONVERT(varchar, 10006)+',
										'+ISNULL(CONVERT(varchar, p.IDTipoPergunta), NULL)+',
										'''+ISNULL(p.Numero, NULL)+''',
										'''+ ISNULL( p.Descricao, NULL)+''',
										'''+ ISNULL( p.Orientacao, '-')+''',
										'''+ ISNULL( p.Observacao, '-')+''',
										'+CONVERT(varchar, p.ExibirImagem)+',
										'+CONVERT(varchar, p.Ativo)+',
										'+CONVERT(varchar, p.ColetarObservacao)+',
										'+CONVERT(varchar, p.ColetarFoto)+',
										'+ISNULL(CONVERT(varchar, p.IDSecaoPergunta), null)+',
										'+ISNULL(CONVERT(varchar, p.Sequencia), NULL)+',
										'+CONVERT(varchar, p.Obrigatoria)+',
										'''+ ISNULL(p.HabilitarSelecao, NULL) +''',
										'''+ ISNULL(p.DesabilitarSelecao, NULL) +''',
										'''+ ISNULL(p.CodExterno, NULL)+''')' 
										AS INSERTS
from Pergunta as p
where IDQuestionario = 21