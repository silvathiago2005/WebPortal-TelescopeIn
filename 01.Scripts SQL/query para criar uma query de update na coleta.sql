Select ('Update Coleta set DtInicio ='''+cast(CAST(DtInicio as datetime)as varchar)+''', DtTermino = '''+cast(CAST(DtTermino as datetime) as varchar)+'''where IDColeta ='+Cast(IDColeta as varchar)) from Coleta where IDColeta in (
20384,
20385,
20386
)

